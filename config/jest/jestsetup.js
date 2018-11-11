import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Enzyme, {shallow, render, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// React 16 Enzyme adapter
Enzyme.configure({adapter: new Adapter()});

// Making React and enzyme functions available globally to all tests instead of having to import them every time.
global.React = React;
global.Component = Component;
global.shallow = shallow;
global.render = render;
global.mount = mount;
global.localDevBackend = false;