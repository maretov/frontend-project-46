const jsonResultObj = [
  {
    key: 'common',
    status: 'objects',
    value: [
      {
        key: 'follow',
        status: 'added',
        value: false,
      },
      {
        key: 'setting1',
        status: 'notupdated',
        value: 'Value 1',
      },
      {
        key: 'setting2',
        status: 'removed',
        value: 200,
      },
      {
        key: 'setting3',
        status: 'updated',
        value: {
          old: true,
          new: null,
        },
      },
      {
        key: 'setting4',
        status: 'added',
        value: 'blah blah',
      },
      {
        key: 'setting5',
        status: 'added',
        value: {
          key5: 'value5',
        },
      },
      {
        key: 'setting6',
        status: 'objects',
        value: [
          {
            key: 'doge',
            status: 'objects',
            value: [
              {
                key: 'wow',
                status: 'updated',
                value: {
                  old: '',
                  new: 'so much',
                },
              },
            ],
          },
          {
            key: 'key',
            status: 'notupdated',
            value: 'value',
          },
          {
            key: 'ops',
            status: 'added',
            value: 'vops',
          },
        ],
      },
    ],
  },
  {
    key: 'group1',
    status: 'objects',
    value: [
      {
        key: 'baz',
        status: 'updated',
        value: {
          old: 'bas',
          new: 'bars',
        },
      },
      {
        key: 'foo',
        status: 'notupdated',
        value: 'bar',
      },
      {
        key: 'nest',
        status: 'updated',
        value: {
          old: {
            key: 'value',
          },
          new: 'str',
        },
      },
    ],
  },
  {
    key: 'group2',
    status: 'removed',
    value: {
      abc: 12345,
      deep: {
        id: 45,
      },
    },
  },
  {
    key: 'group3',
    status: 'added',
    value: {
      deep: {
        id: {
          number: 45,
        },
      },
      fee: 100500,
    },
  },
];

const jsonResult = JSON.stringify(jsonResultObj);

export default jsonResult;
