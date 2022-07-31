import { GlobalValidators, usefast-data-engine } from '../fast-data-engine';
import { buildTestForm } from './support-files/test-utilities';
import { mount } from 'enzyme';
import { ErrorBoundary } from './support-files/error-boundary';
import React from 'react';

describe('Disconnected form Validation', () => {
  let wrapper;
  let submitHandler;
  let formInfo;

  beforeEach(() => {
    // avoid annoying virtual console errors we don't care about
    jest.spyOn(window._virtualConsole, 'emit').mockImplementation(() => void 0);

    submitHandler = jest.fn();
    formInfo = null;
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = undefined;
    }
  });

  [
    {
      name: 'numeric',
      value: 123
    },
    {
      name: 'boolean',
      value: true
    },
    {
      name: 'array',
      value: []
    },
    {
      name: 'function',
      value: () => {}
    },
    {
      name: 'string',
      value: 'invalid'
    }
  ].forEach(t =>
    it(`Error raised when invalid initial form values of ${t.name} type is used.`, () => {
      const callMount = () => usefast-data-engine(submitHandler, t.value, null);

      expect(callMount).toThrowError(
        new Error(
          'fast-data-engine: the given initial values argument is of an invalid type. Must be an object.'
        )
      );
    })
  );

  [
    {
      name: 'numeric',
      value: 123
    },
    {
      name: 'boolean',
      value: true
    },
    {
      name: 'object',
      value: {}
    },
    {
      name: 'array',
      value: []
    },
    {
      name: 'string',
      value: 'invalid'
    }
  ].forEach(t =>
    it(`Error raised when invalid form submit handler of ${t.name} type is used.`, () => {
      const callMount = () => usefast-data-engine(t.value, {});

      expect(callMount).toThrowError(
        new Error(
          'fast-data-engine: the given form submit handler argument is of an invalid type. Must be a function.'
        )
      );
    })
  );

  [
    {
      name: 'object',
      validator: {} // invalid type
    },
    {
      name: 'boolean',
      validator: false // invalid type
    },
    {
      name: 'undefined',
      validator: undefined // invalid type
    }
  ].forEach(invalidValidatorDef =>
    it(`Correct error is thrown when the given global validator of invalid type (${invalidValidatorDef.name})`, () => {
      const originalError = console.error;
      console.error = jest.fn(); // prevents React 16 error boundary warning

      GlobalValidators.isEmail = invalidValidatorDef;

      const FormWrapper = () => {
        formInfo = usefast-data-engine(submitHandler, { field1: 'test', field2: '' });
        return buildTestForm(formInfo, ['isEmail'], []);
      };

      wrapper = mount(
        <ErrorBoundary>
          <FormWrapper />
        </ErrorBoundary>
      );

      const callMount = () =>
        wrapper.find('[data-test="force-validation-button"]').simulate('click');

      expect(callMount).toThrowError(
        new Error(
          'fast-data-engine: the given validator must be either a string or a function.'
        )
      );

      console.error = originalError;

      delete GlobalValidators.isEmail;
    })
  );

  [
    {
      name: 'numeric',
      value: 123
    },
    {
      name: 'boolean',
      value: true
    },
    {
      name: 'array',
      value: []
    },
    {
      name: 'array',
      value: {}
    }
  ].forEach(v =>
    it(`Handle an invalid error message of ${v.name} type correctly`, () => {
      const originalError = console.error;
      console.error = jest.fn(); // prevents React 16 error boundary warning

      const customValidator = {
        validator: () => false,
        errorMessage: v.value
      };

      const FormWrapper = () => {
        formInfo = usefast-data-engine(submitHandler, { field1: 'test', field2: '' });
        return buildTestForm(formInfo, [customValidator], []);
      };

      wrapper = mount(
        <ErrorBoundary>
          <FormWrapper />
        </ErrorBoundary>
      );

      const callMount = () =>
        wrapper.find('[data-test="force-validation-button"]').simulate('click');

      expect(callMount).toThrowError(
        new Error(
          `fast-data-engine: a validator's errorMessage field must be either a string or a function that returns a string.`
        )
      );

      console.error = originalError;
    })
  );

  [
    {
      validator: [{ invalidValidatorFunc: { validator: false } }],
      type: 'boolean'
    },
    {
      validator: [{ invalidValidatorFunc: { validator: 123 } }],
      type: 'number'
    }
  ].forEach(v =>
    it(`Handle validator of invalid type "${v.type}"`, () => {
      const FormWrapper = () => {
        formInfo = usefast-data-engine(
          submitHandler,
          { field1: '', field2: 'testValue' },
          {}
        );
        return buildTestForm(formInfo, v.validator, []);
      };

      wrapper = mount(
        <ErrorBoundary>
          <FormWrapper />
        </ErrorBoundary>
      );

      // still valid because we didn't fin the validation
      expect(formInfo.isValid).toBe(true);

      const callMount = () =>
        wrapper.find('[data-test="force-validation-button"]').simulate('click');

      expect(callMount).toThrowError(
        new Error(
          `fast-data-engine: the validator value passed into useInput must be a single string, a custom validator object or an array of these.`
        )
      );
    })
  );

  [
    {
      validator: [{ validator: [] }],
      type: 'validator of array type',
      error: 'fast-data-engine: validators must be of string or object type.'
    },
    {
      validator: [{ validator: 123 }],
      type: 'validator of 123 type',
      error: 'fast-data-engine: validators must be of string or object type.'
    },
    {
      validator: [{ validator: false }],
      type: 'validator of boolean type',
      error: 'fast-data-engine: validators must be of string or object type.'
    },
    {
      validator: [{ validator: null }],
      type: 'validator of null type',
      error: 'fast-data-engine: validators must be of string or object type.'
    }
  ].forEach(v =>
    it(`Handle global validator of invalid ${v.type}`, () => {
      GlobalValidators.invalidValidator = v.validator;

      const FormWrapper = () => {
        formInfo = usefast-data-engine(
          submitHandler,
          { field1: '', field2: 'testValue' },
          {}
        );
        return buildTestForm(formInfo, ['invalidValidator'], []);
      };

      wrapper = mount(
        <ErrorBoundary>
          <FormWrapper />
        </ErrorBoundary>
      );

      // still valid because we didn't fin the validation
      expect(formInfo.isValid).toBe(true);

      const callMount = () =>
        wrapper.find('[data-test="force-validation-button"]').simulate('click');

      expect(callMount).toThrowError(new Error(v.error));
    })
  );

  [
    {
      validator: false,
      type: 'bare boolean type',
      error:
        'fast-data-engine: the validator value passed into useInput must be a single string, a custom validator object or an array of these.'
    },
    {
      validator: 123,
      type: 'bare numeric type',
      error:
        'fast-data-engine: the validator value passed into useInput must be a single string, a custom validator object or an array of these.'
    },
    {
      validator: null,
      type: 'bare null type',
      error:
        'fast-data-engine: the validator value passed into useInput must be a single string, a custom validator object or an array of these.'
    },
    {
      validator: [false],
      type: 'boolean type',
      error:
        'fast-data-engine: the validator value passed into useInput must be a single string, a custom validator object or an array of these.'
    },
    {
      validator: [123],
      type: 'numeric type',
      error:
        'fast-data-engine: the validator value passed into useInput must be a single string, a custom validator object or an array of these.'
    },
    {
      validator: [undefined],
      type: 'undefined type',
      error:
        'fast-data-engine: the validator value passed into useInput must be a single string, a custom validator object or an array of these.'
    },
    {
      validator: [null],
      type: 'null type',
      error:
        'fast-data-engine: the validator value passed into useInput must be a single string, a custom validator object or an array of these.'
    },
    {
      validator: [[]],
      type: 'array validator value',
      error:
        'fast-data-engine: the validator value passed into useInput must be a single string, a custom validator object or an array of these.'
    }
  ].forEach(v =>
    it(`Handle custom validator of invalid ${v.type}`, () => {
      const FormWrapper = () => {
        formInfo = usefast-data-engine(
          submitHandler,
          { field1: '', field2: 'testValue' },
          {}
        );
        return buildTestForm(formInfo, v.validator, []);
      };

      wrapper = mount(
        <ErrorBoundary>
          <FormWrapper />
        </ErrorBoundary>
      );

      // still valid because we didn't fin the validation
      expect(formInfo.isValid).toBe(true);

      const callMount = () =>
        wrapper.find('[data-test="force-validation-button"]').simulate('click');

      expect(callMount).toThrowError(new Error(v.error));
    })
  );
});
