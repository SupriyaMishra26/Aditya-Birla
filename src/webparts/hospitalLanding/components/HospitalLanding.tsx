import * as React from 'react';
import type { IHospitalLandingProps } from './IHospitalLandingProps';
import App from './App';

export default class HospitalLanding extends React.Component<IHospitalLandingProps> {
  public render(): React.ReactElement<IHospitalLandingProps> {
    return <App />;
  }
}