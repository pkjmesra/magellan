'use strict';

const help = require('../src/cli_help');
const settings = require('../src/settings');

jest.mock('../src/settings', () => {
  return {
    testExecutors: {
      'sauce': {
        name: 'FAKE_EXE_NAME',
        help: {
          'visible-command': {
            'category': 'Usability',
            'visible': true,
            'description': 'FAKE_VISIBLE_DES'
          },
          'invisible-command': {
            'category': 'Usability',
            'visible': false,
            'description': 'FAKE_INVISIBLE_DES'
          },
          'another-visible-command': {
            'category': 'Usability',
            'description': 'FAKE_ANOTHER_VISIBLE_DES'
          }
        }
      }
    },
    framework: 'FAKE_FRAME_NAME',
    testFramework: {
      help: {
        tags: {
          example: 'tag1,tag2',
          visible: true,
          description: 'Run all tests that match a list of comma-delimited tags (eg: tag1,tag2)'
        },
        group: {
          example: 'prefix/path',
          description: 'Run all tests that match a path prefix like ./tests/smoke'
        },
        test: {
          example: 'prefix/path/test',
          visible: false,
          description: 'Run all tests that match a path prefix like ./tests/smoke'
        }
      }
    },
    strategies: {
      bail: {
        help: {
          'early_bail_threshold': {
            'visible': true,
            'type': 'string',
            'example': '0.1',
            'description': 'Ratio of tests that need to fail before we abandon the build'
          },
          'early_bail_min_attempts': {
            'visible': true,
            'type': 'string',
            'example': '10',
            'description': 'Minimum number of tests that need to run before we apply the bail strategy'
          },
          'early_bail_hidden': {
            'visible': false,
            'type': 'string',
            'example': '10',
            'description': 'Hidden config'
          }
        }
      }
    }
  };
});

describe('cli_help', () => {
  test('print executors', () => {
    help.help();
  });
});
