import React from 'react';
import { bool } from 'prop-types';
import { Field } from 'formik';
import * as Yup from 'yup';
import { updateUser } from 'common/constants/api';
import { validationErrorMessages } from 'common/constants/messages';
import Input from 'components/Form/Input/Input';
import Select from 'components/Form/Select/Select';
import styles from './_steps.css';

class PersonalDetails extends React.Component {
  static propTypes = {
    isSubmitting: bool,
  };

  static defaultProps = {
    isSubmitting: false,
  };

  static validationSchema = Yup.object().shape({
    firstName: Yup.string().required(validationErrorMessages.required),
    lastName: Yup.string().required(validationErrorMessages.required),
    employmentStatus: Yup.string().required(validationErrorMessages.required),
    companyName: Yup.string(),
    companyRole: Yup.string(),
  });

  static initialValues = {
    firstName: '',
    lastName: '',
    employmentStatus: '',
    companyName: '',
    companyRole: '',
  };

  static submitHandler = async values => {
    console.log('Values at PersonalDetails:', values);
    await updateUser(values);
  };

  render() {
    const { isSubmitting } = this.props;

    return (
      <>
        <h2 className={styles.row}>Personal Details</h2>

        <div className={styles.row}>
          <Field
            type="text"
            name="firstName"
            label="First Name*"
            component={Input}
            disabled={isSubmitting}
            autoComplete="given-name"
          />

          <Field
            type="text"
            name="lastName"
            label="Last Name*"
            component={Input}
            disabled={isSubmitting}
            autoComplete="family-name"
          />
        </div>

        <div className={styles.row}>
          <Field
            className={styles.fullWidth}
            name="employmentStatus"
            label="Employment Status*"
            component={Select}
            options={[
              {
                value: '',
                label: '-- Select One --',
              },
              {
                value: 'fulltime',
                label: 'Employed Full-Time',
              },
              {
                value: 'parttime',
                label: 'Employed Part-Time',
              },
              {
                value: 'unemployed',
                label: 'Currently Unemployed',
              },
            ]}
            disabled={isSubmitting}
          />
        </div>

        <div className={styles.row}>
          <Field
            type="text"
            name="companyName"
            label="Company Name"
            component={Input}
            disabled={isSubmitting}
          />

          <Field
            type="text"
            name="companyRole"
            label="Company Role"
            component={Input}
            disabled={isSubmitting}
          />
        </div>
      </>
    );
  }
}

export default PersonalDetails;
