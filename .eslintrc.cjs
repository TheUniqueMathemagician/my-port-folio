const maxDepth = 2
const complexity = 12
const maxLinesPerFunction = 500
const maxNestedCallbacks = 2
const maxFunctionParameters = 3

module.exports = {
	extends: [
		"next/core-web-vitals",
		"next",
	],
	rules: {
		"accessor-pairs": ["warn", { getWithoutSet: true }],
		"array-bracket-newline": ["warn", "consistent"],
		"array-bracket-spacing": ["warn", "never"],
		"array-element-newline": ["warn", "consistent"],
		"arrow-body-style": ["warn", "as-needed"],
		"arrow-parens": ["warn", "always"],
		"arrow-spacing": ["warn", { after: true, before: true }],
		"block-scoped-var": "warn",
		"block-spacing": ["warn", "always"],
		"brace-style": ["warn", "1tbs", { allowSingleLine: true }],
		"camelcase": ["warn", { ignoreDestructuring: true, ignoreImports: true, properties: "never" }],
		"capitalized-comments": ["warn", "always", { ignoreConsecutiveComments: true }],
		"comma-dangle": ["warn", "always-multiline"],
		"comma-spacing": ["warn", { after: true, before: false }],
		"comma-style": ["warn", "last"],
		"complexity": ["warn", complexity],
		"computed-property-spacing": ["warn", "never"],
		"consistent-return": ["warn", { treatUndefinedAsUnspecified: true }],
		"curly": ["warn", "multi-line", "consistent"],
		"dot-location": ["warn", "property"],
		"eol-last": ["warn", "always"],
		"func-call-spacing": ["warn", "never"],
		"function-call-argument-newline": ["warn", "consistent"],
		"function-paren-newline": ["warn", "consistent"],
		"generator-star-spacing": ["warn", { after: true, before: false }],
		"getter-return": "warn",
		// "guard-for-in": "warn",
		"implicit-arrow-linebreak": ["warn", "beside"],
		"indent": ["warn", "tab", { SwitchCase: 1 }],
		"init-declarations": ["warn", "always"],
		"jsx-quotes": ["warn", "prefer-double"],
		"key-spacing": ["warn", { afterColon: true, beforeColon: false }],
		"keyword-spacing": ["warn", { after: true, before: true }],
		"line-comment-position": ["warn", { position: "above" }],
		"linebreak-style": ["warn", "windows"],
		"max-depth": ["warn", maxDepth],
		"max-len": ["warn", { code: 300 }],
		"max-lines-per-function": ["warn", maxLinesPerFunction],
		"max-nested-callbacks": ["warn", maxNestedCallbacks],
		"max-params": ["warn", maxFunctionParameters],
		"max-statements-per-line": ["warn", { max: 1 }],
		"new-cap": ["warn", { capIsNew: false, newIsCap: true }],
		"new-parens": "warn",
		"no-alert": "warn",
		"no-array-constructor": "warn",
		"no-await-in-loop": "warn",
		"no-caller": "warn",
		"no-case-declarations": "warn",
		"no-class-assign": "warn",
		"no-compare-neg-zero": "warn",
		"no-cond-assign": "warn",
		"no-confusing-arrow": ["warn", { allowParens: true }],
		"no-console": "warn",
		"no-const-assign": "warn",
		"no-constructor-return": "warn",
		"no-debugger": "warn",
		"no-dupe-args": "warn",
		"no-dupe-class-members": "warn",
		"no-dupe-keys": "warn",
		"no-duplicate-imports": "warn",
		"no-else-return": "warn",
		"no-empty": "warn",
		"no-empty-character-class": "warn",
		"no-empty-function": "warn",
		"no-empty-pattern": "warn",
		"no-empty-static-block": "warn",
		"no-eq-null": "warn",
		"no-eval": "warn",
		"no-ex-assign": "warn",
		"no-extend-native": "warn",
		"no-extra-bind": "warn",
		"no-extra-boolean-cast": "warn",
		"no-extra-label": "warn",
		// "no-extra-parens": ["warn", "all", { nestedBinaryExpressions: false }],
		"no-extra-semi": "warn",
		"no-fallthrough": "warn",
		"no-floating-decimal": "warn",
		"no-func-assign": "warn",
		"no-implicit-coercion": ["warn", { boolean: false, number: true, string: true }],
		"no-implicit-globals": "warn",
		"no-implied-eval": "warn",
		"no-inline-comments": "warn",
		"no-invalid-regexp": "warn",
		"no-invalid-this": "warn",
		"no-irregular-whitespace": "warn",
		"no-iterator": "warn",
		"no-label-var": "warn",
		"no-lone-blocks": "warn",
		"no-lonely-if": "warn",
		"no-loop-func": "warn",
		"no-magic-numbers": ["warn", { ignore: [0, 1], ignoreArrayIndexes: true }],
		"no-misleading-character-class": "warn",
		"no-mixed-spaces-and-tabs": "warn",
		"no-multi-spaces": "warn",
		"no-multiple-empty-lines": ["warn", { max: 1 }],
		"no-negated-condition": "warn",
		"no-nested-ternary": "warn",
		"no-new": "warn",
		"no-new-func": "warn",
		"no-new-native-nonconstructor": "warn",
		"no-new-object": "warn",
		"no-new-symbol": "warn",
		"no-new-wrappers": "warn",
		"no-nonoctal-decimal-escape": "warn",
		"no-obj-calls": "warn",
		"no-octal-escape": "warn",
		"no-proto": "warn",
		"no-prototype-builtins": "warn",
		"no-redeclare": "warn",
		"no-regex-spaces": "warn",
		"no-return-assign": "warn",
		"no-return-await": "warn",
		"no-script-url": "warn",
		"no-self-assign": "warn",
		"no-self-compare": "warn",
		"no-sequences": "warn",
		"no-setter-return": "warn",
		"no-sparse-arrays": "warn",
		"no-template-curly-in-string": "warn",
		"no-this-before-super": "warn",
		"no-throw-literal": "warn",
		"no-trailing-spaces": "warn",
		// "no-undef": "warn",
		"no-undef-init": "warn",
		"no-underscore-dangle": "warn",
		"no-unexpected-multiline": "warn",
		"no-unmodified-loop-condition": "warn",
		"no-unneeded-ternary": "warn",
		"no-unreachable": "warn",
		"no-unreachable-loop": "warn",
		"no-unsafe-finally": "warn",
		"no-unsafe-negation": "warn",
		"no-unsafe-optional-chaining": "warn",
		"no-unused-expressions": "warn",
		"no-unused-labels": "warn",
		"no-unused-private-class-members": "warn",
		"no-use-before-define": "warn",
		"no-useless-backreference": "warn",
		"no-useless-call": "warn",
		"no-useless-catch": "warn",
		"no-useless-computed-key": "warn",
		"no-useless-concat": "warn",
		"no-useless-constructor": "warn",
		"no-useless-escape": "warn",
		"no-useless-rename": "warn",
		"no-useless-return": "warn",
		"no-var": "warn",
		"no-void": "warn",
		"no-whitespace-before-property": "warn",
		"no-with": "warn",
		"nonblock-statement-body-position": ["warn", "beside"],
		"object-curly-newline": ["warn", { consistent: true }],
		"object-curly-spacing": ["warn", "always"],
		"object-property-newline": ["warn", { allowAllPropertiesOnSameLine: true }],
		"one-var": ["warn", "never"],
		"one-var-declaration-per-line": ["warn", "initializations"],
		"operator-assignment": ["warn", "always"],
		"operator-linebreak": ["warn", "before"],
		"padded-blocks": ["warn", "never"],
		"prefer-const": "warn",
		"prefer-exponentiation-operator": "warn",
		"prefer-numeric-literals": "warn",
		"prefer-object-has-own": "warn",
		"prefer-object-spread": "warn",
		"prefer-promise-reject-errors": "warn",
		"prefer-rest-params": "warn",
		"prefer-spread": "warn",
		"prefer-template": "warn",
		"quote-props": ["warn", "consistent-as-needed"],
		"quotes": ["warn", "double"],
		"radix": "warn",
		"require-await": "warn",
		"require-yield": "warn",
		"rest-spread-spacing": ["warn", "never"],
		"semi": ["warn", "never"],
		"semi-spacing": ["warn", { after: true, before: false }],
		"semi-style": ["warn", "last"],
		"sort-imports": ["warn", { ignoreDeclarationSort: true }],
		// "sort-keys": ["warn", "asc", { caseSensitive: true, natural: false }],
		"sort-vars": "warn",
		"space-before-blocks": ["warn", "always"],
		"space-before-function-paren": ["warn", { anonymous: "always", asyncArrow: "always", named: "never" }],
		"space-in-parens": ["warn", "never"],
		"space-infix-ops": "warn",
		"space-unary-ops": ["warn", { nonwords: false, words: true }],
		"spaced-comment": ["warn", "always", { markers: ["/"] }],
		"switch-colon-spacing": ["warn", { after: true, before: false }],
		"template-curly-spacing": ["warn", "never"],
		"template-tag-spacing": ["warn", "never"],
		"unicode-bom": ["warn", "never"],
		"use-isnan": "warn",
		"valid-typeof": "warn",
		"wrap-iife": ["warn", "inside"],
		"wrap-regex": "warn",
		"yield-star-spacing": ["warn", { after: true, before: false }],
		"yoda": "warn",
		// Padding-line-between-statements
	},
}
