import React from 'react';
import { storiesOf } from '@storybook/react';
import LoadingIcons from "../src/js/components/shared/icons/loading-icons.component";
import SearchPortalApp from "../src/js/app";

storiesOf('SearchPortaal', module)
  .add('Default', () => (
    <div className="ESGFSearchPortal">
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
      <SearchPortalApp />
    </div>
  ))
  ;

storiesOf('LoadingIcons', module)
  .add('Spinner', () => (
    <div className="ESGFSearchPortal">
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
      <LoadingIcons.Spinner />
    </div>
  ))
  .add('NoConnection', () => (
    <div className="ESGFSearchPortal">
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
      <LoadingIcons.NoConnection />
    </div>
  ))
  .add('Error', () => (
    <div className="ESGFSearchPortal">
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
      <LoadingIcons.Error />
    </div>
  ));
