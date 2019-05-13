import React, { Component } from 'react';
import { array, bool, objectOf, oneOfType, string } from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { login } from 'common/utils/auth-utils';
import { insertIf } from 'common/utils/array-utils';
import MultiStepForm from 'components/Form/MultiStepForm';
import { isMobileSelector } from 'store/screenSize/selectors';
import { Initial, PersonalDetails, MilitaryStatus, MilitaryDetails, Technology } from './steps';

// TODO: PREVENT BEING ABLE TO GO BACK TO FIRST STEP

export class RegistrationForm extends Component {
  static propTypes = {
    initialValues: objectOf(oneOfType([array, string])),
    isMobileView: bool,
  };

  static defaultProps = {
    initialValues: {
      ...Initial.initialValues,
      ...PersonalDetails.initialValues,
      ...MilitaryStatus.initialValues,
      ...MilitaryDetails.initialValues,
      ...Technology.initialValues,
    },
    isMobileView: false,
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
    const { initialValues, isMobileView } = this.props;
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
        isMobileView={isMobileView}
        onAllButLastStepSubmit={this.onValueChange}
        onFinalSubmit={login}
        // TODO: Handle success
        onFinalSubmitSuccess={() => {}}
        steps={steps}
      />
    );
  }
}

const mapStateToProps = state => ({
  isMobileView: isMobileSelector(state),
});

export default compose(connect(mapStateToProps))(RegistrationForm);
