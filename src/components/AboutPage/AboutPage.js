import React from 'react';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const AboutPage = () => (
  <div className="container">
    <div className="aboutCenter">
      <h2>About watchUwatch</h2>
      <p>watchUwatch is my solo project for my time at Prime Academy. It is a full-stack
        application that is enabled mainly with React, Redux and Redux-Sagas. Also 
        employed are Node, Express, Passport, and PostgreSQL. CSS and associated libraries were used for styling.

        Future releases will integrate with the Open Movie Database API project
        (http://www.omdbapi.com) and a social media feature set that includes show recommendations
        and chat forums.
      </p>
    </div>
  </div>
);

export default AboutPage;
