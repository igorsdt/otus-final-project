/* eslint-disable import/no-default-export, no-magic-numbers  */

import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import { defineConfig } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import importPlugin from 'eslint-plugin-import';
import perfectionist from 'eslint-plugin-perfectionist';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import sortDestructureKeys from 'eslint-plugin-sort-destructure-keys';
import globals from 'globals';

/**
 * Правила именования boolean-пропсов в React-компонентах (@typescript-eslint/naming-convention):
 * Аналог: react/boolean-prop-naming.
 *
 * 1. Может начинаться с префикса:
 *
 *    Префикс                       Пример
 *    --------------------------------------
 *    allow-                        allowOpen
 *    auto-                         autoComplete
 *    can-                          canDrop
 *    force-                        forcePropagation
 *    has-                          hasMenu
 *    is-, are-,                    isOpen
 *    should-                       shouldClose
 *    show-, hide-                  showMenu, hideChat
 *    stop-                         stopPropagation
 *    with-, no-                    withLoader, noWrap
 *
 * 2. Может быть прилагательным, заканчивающимся суффиксом:
 *
 *    Суффикс                       Пример
 *    ---------------------------------------
 *    -able, -ible, -iple           available, visible, multiple
 *    -al                           central
 *    -ant, -ent                    dependant, current
 *    -ar                           popular
 *    -ary, -ory                    ordinary, mandatory
 *    -ate                          indeterminate
 *    -ful, -less                   powerful, soundless
 *    -ive                          selective
 *    -ly                           monthly
 *    -y                            lazy
 *
 * 3. Может быть прилагательным, образованным из формы глагола Participle I/II, с суффиксом:
 *
 *    Суффикс                       Пример
 *    ---------------------------------------
 *    -ed                           disabled
 *    -en                           hidden
 *    -ing                          growing
 *    -ken                          broken
 *
 * 4. Может быть любым общеупотребимым прилагательным или зарезервированным словом:
 *
 *    Пример: readonly, valid, value.
 *
 */
const TS_BOOL_PROP_PREFIX =
  '(allow|auto|can|force|has|is|are|should|show|stop|hide|with|no|silent)[A-Z]\\w+';
const TS_BOOL_PROP_SUFFIX_ADJECTIVE1 = '[ai]ble|al|[ae]nt|ar|[ao]ry|ate|ful|less|ive|ly|y';
const TS_BOOL_PROP_SUFFIX_ADJECTIVE2 = 'ed|k?en|ing';
const TS_BOOL_PROP_SUFFIX_ADJECTIVE = `\\w+[a-z](${TS_BOOL_PROP_SUFFIX_ADJECTIVE1}|${TS_BOOL_PROP_SUFFIX_ADJECTIVE2})`;
const TS_BOOL_PROP_WORD =
  '(default)?[Vv]alue|flat|inline|(in)?valid|mobile|multiple|plain|read[Oo]nly|simple|slim|spellCheck|wide|fusion';
const TS_BOOL_PROP_NAMING_REGEX = `^(${TS_BOOL_PROP_PREFIX}|${TS_BOOL_PROP_SUFFIX_ADJECTIVE}|${TS_BOOL_PROP_WORD})$`; // prettier-ignore
const TS_NAMING_CONVERSATION = {
  selector: 'typeProperty',
  types: ['boolean'],
  format: ['camelCase'],
  custom: {
    regex: TS_BOOL_PROP_NAMING_REGEX,
    match: true,
  },
};

/**
 * Настройки комбинированных экспортов: типы и объекты (@typescript-eslint/consistent-type-exports)
 * Исправляет экспорты, если там неявно импортируются типы.
 */
const TS_CONSISTENT_TYPE_EXPORTS = {
  fixMixedExportsWithInlineTypeSpecifier: true,
};

/**
 * Настройки комбинированных импортов: типы и объекты (@typescript-eslint/consistent-type-imports)
 * Исправляет импорты, если там неявно экспортируются типы.
 */
const TS_CONSISTENT_TYPE_IMPORTS = {
  prefer: 'type-imports',
  disallowTypeAnnotations: false,
  fixStyle: 'inline-type-imports',
};

/**
 * Настройки сортировки пропсов в JSX-разметке (react/jsx-sort-props):
 * Сортировать пропсы, но обработчики - в конец.
 */
const REACT_JSX_SORT_PROPS = {
  callbacksLast: true,
  ignoreCase: true,
};

/**
 * Настройка защиты от циклических зависимостей при импорте (import/no-cycle).
 * Разрешить только динамический импорт обратных зависимостей.
 */
const IMPORT_NO_CYCLE = {
  allowUnsafeDynamicCyclicDependency: true,
};

/**
 * Настройки путей, используемых при импорте (no-restricted-imports):
 * Запрещено импортировать файлы из папок уровнем выше с помощью относительного синтаксиса.
 */
const NO_RESTRICTED_IMPORTS_PATTERN = {
  group: ['**/../*'],
  message: '~ Relative imports from parent folders are not allowed. Use absolute one starting from `src` folder. ~ ', // prettier-ignore
};
const NO_RESTRICTED_IMPORTS = { patterns: [NO_RESTRICTED_IMPORTS_PATTERN] };

/**
 * Запрещенный синтакс JavaScript/TypeScript (no-restricted-syntax):
 * Запрещено использовать синтаксис перечислений enum (является антипаттерном).
 */
const NO_RESTRICTED_SYNTAX = {
  selector: 'TSEnumDeclaration',
  message: '~ Enums are not allowed. You should use an object literal type instead. ~ ',
};

/**
 * Настройка запрета на использование "магических" цифр (no-magic-numbers).
 * Запрещено использовать абстрактные цифры. Следует заменить их константами с говорящим названием.
 */
const NO_MAGIC_NUMBERS = { ignore: [-1, 0, 1, '-1n', '0n', '1n'] };

/**
 * Настройка сортировки импортов (sort-imports).
 * Отвечает только за сортировку членов внутри одного импорта. За остальное отвечает import/order.
 */
const SORT_IMPORTS = {
  ignoreCase: true,
  ignoreDeclarationSort: true,
};

/**
 * @type {import("eslint").defineConfig}
 */
const config = defineConfig([
  // Правила общие
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
    },
    plugins: {
      import: importPlugin,
      perfectionist,
      'simple-import-sort': simpleImportSort,
      'sort-destructure-keys': sortDestructureKeys,
    },
    rules: {
      'getter-return': [2, { allowImplicit: true }],
      'import/exports-last': 1,
      'import/newline-after-import': 1,
      'import/no-default-export': 2,
      'import/no-self-import': 2,
      'import/no-useless-path-segments': 1,
      'import/no-cycle': [2, IMPORT_NO_CYCLE],
      'import/no-deprecated': 1, // Работает на уровне запрещения всего модуля или отдельных типов
      'import/no-duplicates': [1, { considerQueryString: true }],
      'import/order': [
        1,
        {
          alphabetize: { order: 'asc' },
          groups: [['builtin', 'external'], 'internal', ['index', 'parent', 'sibling']],
          pathGroupsExcludedImportTypes: ['builtin'],
          pathGroups: [
            {
              pattern: 'react*',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@/**',
              group: 'internal',
            },
            {
              pattern: './**/*.scss',
              group: 'index',
              position: 'after',
            },
            {
              pattern: './**/*.css',
              group: 'index',
              position: 'after',
            },
          ],
        },
      ],
      'no-alert': 1, // TODO: Сделать альтернативу для режима сборки
      'no-console': 1, // TODO: Сделать альтернативу для режима сборки
      'no-debugger': 1, // TODO: Сделать альтернативу для режима сборки
      'no-else-return': 1,
      'no-constant-binary-expression': 2,
      'no-empty-function': 1,
      'no-implied-eval': 2,
      'no-lonely-if': 1,
      'no-magic-numbers': [1, NO_MAGIC_NUMBERS],
      'no-promise-executor-return': 2,
      'no-restricted-imports': [1, NO_RESTRICTED_IMPORTS],
      'no-restricted-syntax': [2, NO_RESTRICTED_SYNTAX],
      'perfectionist/sort-union-types': 1,
      'perfectionist/sort-object-types': 1,
      'prefer-template': 1,
      'require-await': 1,
      'sort-imports': [1, SORT_IMPORTS],
      'simple-import-sort/exports': 1,
      'no-return-await': 2,
      'sort-destructure-keys/sort-destructure-keys': [1, { caseSensitive: false }],
      'spaced-comment': 1,
      yoda: [1, 'never', { exceptRange: true }],
    },
  },

  // Правила для TypeScript
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@typescript-eslint': tsPlugin, // Key must match plugin name
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: true,
      },
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      '@typescript-eslint/consistent-type-definitions': [2, 'type'],
      '@typescript-eslint/ban-ts-comment': 0,
      '@typescript-eslint/ban-types': 0,
      '@typescript-eslint/consistent-type-imports': [1, TS_CONSISTENT_TYPE_IMPORTS],
      '@typescript-eslint/consistent-type-exports': [1, TS_CONSISTENT_TYPE_EXPORTS],
      '@typescript-eslint/naming-convention': [1, TS_NAMING_CONVERSATION],
      '@typescript-eslint/no-dupe-class-members': 2,
      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/no-for-in-array': 2,
      '@typescript-eslint/no-non-null-assertion': 0,
      '@typescript-eslint/no-redundant-type-constituents': 1,
      '@typescript-eslint/no-unnecessary-boolean-literal-compare': 1,
      '@typescript-eslint/no-unnecessary-condition': 1,
      '@typescript-eslint/no-unused-expressions': 0,
      '@typescript-eslint/no-unused-vars': [
        1,
        { varsIgnorePattern: '^_', caughtErrors: 'none', ignoreRestSiblings: true },
      ],
      '@typescript-eslint/no-var-requires': 0,
      '@typescript-eslint/prefer-includes': 1,
      '@typescript-eslint/prefer-optional-chain': 1,
      '@typescript-eslint/require-array-sort-compare': [2, { ignoreStringArrays: true }],
      'no-dupe-class-members': 0,
      'no-redeclare': 0,
      'no-undef': 0,
    },
  },

  // Правила для React
  {
    files: ['**/*.@(ts|tsx)', '**/*.jsx'],
    plugins: {
      ...react.configs.flat.recommended.plugins,
      'react-hooks': reactHooks,
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      ...react.configs.flat.recommended.rules,
      ...reactHooks.configs['recommended-latest'].rules,
      '@typescript-eslint/no-require-imports': 0,
      'react/button-has-type': 1,
      'react/display-name': 2,
      'react/jsx-fragments': [1, 'syntax'],
      'react/jsx-no-useless-fragment': 1,
      'react/jsx-props-no-spreading': 0,
      'react/jsx-sort-props': [1, REACT_JSX_SORT_PROPS],
      'react/jsx-uses-react': 0,
      'react/no-array-index-key': 2,
      'react/prop-types': 0,
      'react/react-in-jsx-scope': 0,
    },
  },

  // Правила для конфигурационных файлов в корне проекта
  {
    files: ['*.@(js|mjs|ts)'],
    rules: {
      '@typescript-eslint/naming-convention': 0,
      '@typescript-eslint/no-require-imports': 0,
      'react-hooks/rules-of-hooks': 0,
      'react/jsx-props-no-spreading': 0,
      'no-magic-numbers': 0,
      'import/order': 0,
      'import/no-default-export': 0,
    },
  },
  eslintConfigPrettier,
]);

export default config;
