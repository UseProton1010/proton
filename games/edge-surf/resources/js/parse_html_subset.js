// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * This function maps a given string to a TrustedHTML object
 * without performing any validation. Callsites must ensure
 * that the resulting TrustedHTML will only be used in inert
 * documents or sanitize the input before passing to this function.
 * @param {string} s The string to convert.
 * @return {!TrustedHTML} A TrustedHTML containing input string.
 */
const toTrustedHtml = (function () {
  /** @type {!TrustedTypePolicy} */
  let unsanitizedPolicy;

  return function (s) {
    if (!unsanitizedPolicy) {
      unsanitizedPolicy = trustedTypes.createPolicy("parse-html-subset", {
        createHTML: (unsanitizedHtml) => unsanitizedHtml,
      });
    }
    return unsanitizedPolicy.createHTML(s);
  };
})();

/**
 * @typedef {{
 *   substitutions: (!Array<string>|undefined),
 *   attrs: (!Array<string>|undefined),
 *   tags: (!Array<string>|undefined),
 * }}
 */
/* #export */ let SanitizeInnerHtmlOpts;

/**
 * Make a string safe for Polymer bindings that are inner-h-t-m-l or other
 * innerHTML use.
 * @param {string} rawString The unsanitized string
 * @param {SanitizeInnerHtmlOpts=} opts Optional additional allowed tags and
 *     attributes.
 * @return {string}
 */
/* #export */ const sanitizeInnerHtml = function (rawString, opts) {
  opts = opts || {};
  return parseHtmlSubset("<b>" + rawString + "</b>", opts.tags, opts.attrs)
    .firstChild.innerHTML;
};

/**
 * Parses a very small subset of HTML. This ensures that insecure HTML /
 * javascript cannot be injected into WebUI.
 * @param {string} s The string to parse.
 * @param {!Array<string>=} opt_extraTags Optional extra allowed tags.
 * @param {!Array<string>=} opt_extraAttrs
 *     Optional extra allowed attributes (all tags are run through these).
 * @throws {Error} In case of non supported markup.
 * @return {!DocumentFragment} A document fragment containing the DOM tree.
 */
/* #export */ const parseHtmlSubset = (function () {
  "use strict";

  /** @typedef {function(!Node, string):boolean} */
  let AllowFunction;

  /** @type {!AllowFunction} */
  const allowAttribute = (node, value) => true;

  /**
   * Allow-list of attributes in parseHtmlSubset.
   * @type {!Map<string, !AllowFunction>}
   * @const
   */
  const allowedAttributes = new Map([
    [
      "href",
      (node, value) => {
        // Only allow a[href] starting with edge:// or https:// or equaling
        // to #.
        return (
          node.tagName === "A" &&
          (value.startsWith("edge://") ||
            value.startsWith("https://") ||
            value === "#")
        );
      },
    ],
    [
      "target",
      (node, value) => {
        // Only allow a[target='_blank'].
        // TODO(dbeam): are there valid use cases for target !== '_blank'?
        return node.tagName === "A" && value === "_blank";
      },
    ],
  ]);

  /**
   * Allow-list of optional attributes in parseHtmlSubset.
   * @type {!Map<string, !AllowFunction>}
   * @const
   */
  const allowedOptionalAttributes = new Map([
    ["class", allowAttribute],
    ["id", allowAttribute],
    ["is", (node, value) => value === "action-link" || value === ""],
    ["role", (node, value) => value === "link"],
    [
      "src",
      (node, value) => {
        // Only allow img[src] starting with edge://
        return node.tagName === "IMG" && value.startsWith("edge://");
      },
    ],
    ["tabindex", allowAttribute],
    ["aria-hidden", allowAttribute],
    ["aria-labelledby", allowAttribute],
  ]);

  /**
   * Allow-list of tag names in parseHtmlSubset.
   * @type {!Set<string>}
   * @const
   */
  const allowedTags = new Set([
    "A",
    "B",
    "BR",
    "DIV",
    "KBD",
    "P",
    "PRE",
    "SPAN",
    "STRONG",
  ]);

  /**
   * Allow-list of optional tag names in parseHtmlSubset.
   * @type {!Set<string>}
   * @const
   */
  const allowedOptionalTags = new Set(["IMG", "LI", "UL"]);

  /**
   * @param {!Array<string>} optTags an Array to merge.
   * @return {!Set<string>} Set of allowed tags.
   */
  function mergeTags(optTags) {
    const clone = new Set(allowedTags);
    optTags.forEach((str) => {
      const tag = str.toUpperCase();
      if (allowedOptionalTags.has(tag)) {
        clone.add(tag);
      }
    });
    return clone;
  }

  /**
   * @param {!Array<string>} optAttrs an Array to merge.
   * @return {!Map<string, !AllowFunction>} Map of allowed
   *     attributes.
   */
  function mergeAttrs(optAttrs) {
    const clone = new Map([...allowedAttributes]);
    optAttrs.forEach((key) => {
      if (allowedOptionalAttributes.has(key)) {
        clone.set(key, allowedOptionalAttributes.get(key));
      }
    });
    return clone;
  }

  function walk(n, f) {
    f(n);
    for (let i = 0; i < n.childNodes.length; i++) {
      walk(n.childNodes[i], f);
    }
  }

  function assertElement(tags, node) {
    if (!tags.has(node.tagName)) {
      throw Error(node.tagName + " is not supported");
    }
  }

  function assertAttribute(attrs, attrNode, node) {
    const n = attrNode.nodeName;
    const v = attrNode.nodeValue;
    if (!attrs.has(n) || !attrs.get(n)(node, v)) {
      throw Error(node.tagName + "[" + n + '="' + v + '"] is not supported');
    }
  }

  return function (s, opt_extraTags, opt_extraAttrs) {
    const tags = opt_extraTags ? mergeTags(opt_extraTags) : allowedTags;
    const attrs = opt_extraAttrs
      ? mergeAttrs(opt_extraAttrs)
      : allowedAttributes;

    const doc = document.implementation.createHTMLDocument("");
    const r = doc.createRange();
    r.selectNode(doc.body);

    if (window.trustedTypes) {
      s = toTrustedHtml(s);
    }

    // This does not execute any scripts because the document has no view.
    const df = r.createContextualFragment(s);
    walk(df, function (node) {
      switch (node.nodeType) {
        case Node.ELEMENT_NODE:
          assertElement(tags, node);
          const nodeAttrs = node.attributes;
          for (let i = 0; i < nodeAttrs.length; ++i) {
            assertAttribute(attrs, nodeAttrs[i], node);
          }
          break;

        case Node.COMMENT_NODE:
        case Node.DOCUMENT_FRAGMENT_NODE:
        case Node.TEXT_NODE:
          break;

        default:
          throw Error("Node type " + node.nodeType + " is not supported");
      }
    });
    return df;
  };
})();

/* #ignore */ console.warn("crbug/1173575, non-JS module files deprecated.");

/**
 * Parses a very small subset of HTML. This ensures that insecure HTML /
 * javascript cannot be injected into WebUI. Returns HTML instead of
 * DocumentFragment.
 * @param {string} s The string to parse.
 * @param {!Array<string>=} opt_extraTags Optional extra allowed tags.
 * @param {!Array<string>=} opt_extraAttrs
 *     Optional extra allowed attributes (all tags are run through these).
 * @throws {Error} In case of non supported markup.
 * @return {string|!TrustedHTML} a sanitized HTML.
 */
/* #export */ const parseToSafeHtml = (function () {
  "use strict";

  return function (s, opt_extraTags, opt_extraAttrs) {
    const div = document.createElement("div");
    div.appendChild(parseHtmlSubset(s, opt_extraTags, opt_extraAttrs));
    if (!window.trustedTypes) {
      return div.innerHTML;
    }

    return toTrustedHtml(div.innerHTML);
  };
})();
