import React from 'react';
import { string, bool, func, number, shape, arrayOf, oneOfType, objectOf } from 'prop-types';
import classNames from 'classnames';
import { ErrorMessage } from 'formik';
import Alert from 'components/Alert/Alert';
import Label from 'components/Form/Label/Label';
import ThemedReactSelect from './ThemedReactSelect';
import styles from './Select.css';

/**
 * An object representing the application's visual breakpoints.
 * @typedef {{
 * label: string,
 * value: string,
 * }} Option
 */

class Select extends React.Component {
  static propTypes = {
    className: string,
    field: shape({
      name: string.isRequired,
      value: oneOfType([
        string,
        arrayOf(shape({ label: string.isRequired, value: string.isRequired })),
      ]).isRequired,
    }).isRequired,
    form: shape({
      touched: objectOf(bool).isRequired,
      errors: objectOf(string).isRequired,
      setFieldTouched: func.isRequired,
      setFieldValue: func.isRequired,
    }).isRequired,
    id: oneOfType([string, number]),
    isLabelHidden: bool,
    isMulti: bool,
    label: string.isRequired,
    options: arrayOf(shape({ label: string.isRequired, value: string.isRequired }).isRequired)
      .isRequired,
  };

  static defaultProps = {
    className: undefined,
    id: '',
    isLabelHidden: false,
    isMulti: false,
  };

  /**
   * @memberof Select
   * @description handle changing of non-multi select
   * @param {Option} selected
   */
  onChangeSingle = selected => {
    const { field, form } = this.props;

    form.setFieldValue(field.name, selected.value);
  };

  /**
   * @memberof Select
   * @description handle changing of multi select
   * @param {Option[]} selectedArray
   */
  onChangeMulti = selectedArray => {
    const { field, form } = this.props;

    form.setFieldValue(field.name, selectedArray.map(item => item.value));
  };

  /**
   * @memberof Select
   * @description Return the selected value as a string
   * @returns {string}
   */
  getValueFromSingle = () => {
    const { field, options } = this.props;

    return options.find(option => option.value === field.value);
  };

  /**
   * @memberof Select
   * @description Return an array of selected values for multi selects
   * @returns {string[]}
   */
  getValueFromMulti = () => {
    const { field, options } = this.props;

    return options.filter(option => field.value.includes(option.value));
  };

  handleBlur = () => {
    const { field, form } = this.props;

    form.setFieldTouched(field.name, true);
  };

  render() {
    const {
      className,
      field,
      form: { errors, touched },
      id,
      isLabelHidden,
      isMulti,
      label,
      options,
      ...props // disabled, placeholder, etc.
    } = this.props;

    const { name } = field;
    const hasErrors = Boolean(errors[name]);

    // handlers and value depend on whether or not select allows for multiple selections.
    const value = isMulti ? this.getValueFromMulti() : this.getValueFromSingle();
    const onChangeHandler = isMulti ? this.onChangeMulti : this.onChangeSingle;

    return (
      <div className={classNames(styles.field, className)}>
        <Label for={name} isHidden={isLabelHidden}>
          {label}
        </Label>

        <div>
          <ThemedReactSelect
            {...field}
            {...props}
            hasErrors={hasErrors}
            isTouched={touched[name]}
            id={id}
            isMulti={isMulti}
            name={name}
            onBlur={this.handleBlur}
            onChange={onChangeHandler}
            options={options}
            value={value}
          />

          <ErrorMessage
            name={name}
            render={message => (
              <Alert isOpen={hasErrors} className={styles.errorMessage}>
                {message}
              </Alert>
            )}
          />
        </div>
      </div>
    );
  }
}

export default Select;
