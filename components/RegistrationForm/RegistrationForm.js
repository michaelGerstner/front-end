import React, { Component } from 'react';
import { objectOf, oneOfType, string, array } from 'prop-types';
import { login } from 'common/utils/auth-utils';
import { insertIf } from 'common/utils/array-utils';
import MultiStepForm from 'components/Form/MultiStepForm';
import { Initial, PersonalDetails, MilitaryStatus, MilitaryDetails, Technology } from './steps';

class RegistrationForm extends Component {
  static propTypes = {
    initialValues: objectOf(oneOfType([array, string])),
  };

  static defaultProps = {
    initialValues: {
      // order doesn't matter here
      ...Initial.initialValues,
      ...PersonalDetails.initialValues,
      ...MilitaryStatus.initialValues,
      ...MilitaryDetails.initialValues,
      ...Technology.initialValues,
    },
  };

  state = {
    shouldShowMilitaryStep: false,
  };

  onValueChange = values => {
    if (values.militaryStatus === '') {
      return;
    }

    const isMilitary = values.militaryStatus === 'veteran' || values.militaryStatus === 'current';

    if (isMilitary) {
      this.showMilitaryStep();
    } else {
      this.hideMilitaryStep();
    }
  };

  showMilitaryStep = () => {
    this.setState({ shouldShowMilitaryStep: true });
  };

  hideMilitaryStep = () => {
    this.setState({ shouldShowMilitaryStep: false });
  };

  render() {
    const { initialValues } = this.props;
    const { shouldShowMilitaryStep } = this.state;

    // ordered
    const steps = [
      Initial,
      PersonalDetails,
      MilitaryStatus,
      ...insertIf(shouldShowMilitaryStep, MilitaryDetails),
      Technology,
    ];

    return (
      <MultiStepForm
        initialValues={initialValues}
        onStepSubmit={this.onValueChange}
        onFinalSubmit={login}
        steps={steps}
      />
    );
  }
}

export default RegistrationForm;
