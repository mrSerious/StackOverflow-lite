# StackOverflow-lite
[![Build Status](https://travis-ci.org/mrSerious/StackOverflow-lite.svg?branch=develop)](https://travis-ci.org/mrSerious/StackOverflow-lite) 
[![Coverage Status](https://coveralls.io/repos/github/mrSerious/StackOverflow-lite/badge.svg?branch=develop)](https://coveralls.io/github/mrSerious/StackOverflow-lite?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/2860441e7cd06b1d5439/maintainability)](https://codeclimate.com/github/mrSerious/StackOverflow-lite/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/2860441e7cd06b1d5439/test_coverage)](https://codeclimate.com/github/mrSerious/StackOverflow-lite/test_coverage)

An app where people can ask questions and provide answers.

#
* *See Pivotal Tracker Project Management Board*: https://www.pivotaltracker.com/n/projects/2189147
* *StackOverFlow-Lite Application hosted on github pages*: https://mrserious.github.io/StackOverflow-lite/

## Table of Content
* [Problem Statement](#problem)
* [Features](#features)
* [Background](#background)
* [Installation](#installation)
* [Tests](#tests)
* [Endpoints](#endpoints)

## Problem Statement
Ths StackOverflow API was built to provide users with a means to share problems they may be experiencing - technical or otherwise.

## Features
Here are the list of features StackOverFlow-Lite offers:

* Users can create an account and login
* Users can post questions on StackOverFlow-Lite application
* Users can delete the questions they post
* Users can view the answers to questions on the application
* Users can accept an answer as the most preferred to all answers to his question
* Users can upvote or downvote an answer
* Users can comment on an answer
* Users can fetch all questions he or she has ever asked on the platform
* Users can search for questions on the platform
* Users can view questions with the most answers

## Background

We will build this application with the following technologies.

* [ECMAScript 6](https://en.wikipedia.org/wiki/ECMAScript)
* [NodeJS](https://en.wikipedia.org/wiki/Node.js)
* [ExressJS](https://en.wikipedia.org/wiki/Express.js)

## Installation 

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

* Install NodeJs on your computer. See guide [here](https://nodejs.org/en).
* Clone the git repository:
`git clone https://github.com/mrSerious/StackOverflow-lite.git`.
* Navigate into cloned repository and RUN `npm  install` on your command-line.
* Type `npm start:dev` `npm start` to run the application.
* Open postman and verify all shortlisted endpoints.

## Tests

* Type `npm test` to RUN tests on your command-line.

## Endpoints

<table>
<tr><th>*http verbs*</th><th>*Short-listed endpoints*</th><th> *Functionality* </th></tr>
<tr><td>POST</td><td>/questions </td><td> Adds a question</td></tr>
<tr><td>POST</td><td> /questions/:questionId/answers </td><td> Adds an answer to a particular question</td></tr>
<tr><td>GET</td><td>/questions</td><td> Gets all questions</td></tr>
<tr><td>GET</td><td>/questions/:questionId</td><td>Gets a question by id</td></tr>
<tr><td>DELETE</td><td>/questions/:questionId</td><td>Delete a particular question</td></tr>
</table>

*Application is currently under construction.*

## Authors
* **Tersoo Atsen** - *Initial work* - [mrSerious](https://github.com/mrSerious)
