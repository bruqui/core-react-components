import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {debounce, get, pick} from 'lodash';
import MdcTextField, {Input} from '@material/react-text-field';

// Components
import FormFieldHelperText from './FormFieldHelperText';

// Styles
import '@material/react-text-field/index.scss';
import './TextField.scss';

export default class TextField extends Component {
    constructor(props) {
        super(props);
        this.state = {value: this.props.value, inputRef: null};
        this.handleChange = this.handleChange.bind(this);
        this.initInputRef = this.initInputRef.bind(this);
        this.addEventListeners = this.addEventListeners.bind(this);
        this.onAnimationStart = this.onAnimationStart.bind(this);
        this.onInput = this.onInput.bind(this);
        this.onTransitionStart = this.onTransitionStart.bind(this);
        this.debouncedAddEventListeners = debounce(this.addEventListeners, 300, {trailing: true});
    }

    componentDidUpdate(prevProps, prevState) {
        this.state.inputRef && setTimeout(() => console.log({inputRef: this.state.inputRef}), 5000)
        if(this.state.value) {
            console.log(this.state.value)
        }
    }

    componentWillUnmount() {
        this.state.inputRef.removeEventListener('animationstart');
    }

    onAnimationStart({target, animationName}) {
        const AUTOFILLED = 'text-field__input--is-autofilled';
        const autoFillActions = {
            onAutoFillStart: (element) => {
                element.classList.add(AUTOFILLED);
                this.setState({value: element.value});
            },
            onAutoFillCancel: (element) => {
                element.classList.remove(AUTOFILLED);
                this.setState({value: element.value});
            },
        };

        console.log({target, animationName})

        if (autoFillActions[animationName]) {
            autoFillActions[animationName](target);
        }
    }

    onInput(event) {
        console.log('onInput', {event});
    }

    onTransitionStart(event) {
        console.log('onTransitionStart', {event});
    }

    initInputRef(input) {
        const inputElement = get(input, 'inputElement');

        console.log({inputValue: get(inputElement, 'value')})
        if (get(inputElement, 'value')) {
            this.debouncedAddEventListeners(inputElement);
        }
    }

    addEventListeners(inputElement) {
        inputElement.addEventListener('animationstart', this.onAnimationStart, false);
        inputElement.addEventListener('input', this.onInput, false);
        inputElement.addEventListener('transitionstart', this.onTransitionStart, false);
        this.setState({inputRef: inputElement});
    }

    handleChange(event) {
        event.stopPropagation();
        this.setState({value: event.target.value});
        this.props.onChange(event);
    }

    getClass() {
        const {className, fullWidth} = this.props;

        return classnames({
            'text-field': true,
            'text-field--full-width': fullWidth,
        }, className);
    }

    render() {
        const {
            autoFocus,
            disabled,
            error,
            helperText,
            id,
            inputProps,
            name,
            type,
        } = this.props;

        return (
            <React.Fragment>
                <MdcTextField
                    {...pick(this.props, [
                        'disabled',
                        'label',
                        'floatingLabelClassName',
                        'isRtl',
                        'leadingIcon',
                        'trailingIcon',
                        'lineRippleClassName',
                        'notchedOutlineClassName',
                        'outlined',
                        'textarea',
                    ])}
                    className={this.getClass()}
                >
                    <Input
                        autoFocus={autoFocus}
                        className="text-field__input"
                        disabled={disabled}
                        id={id || name}
                        name={name || id}
                        onChange={this.handleChange}
                        ref={this.initInputRef}
                        type={type}
                        value={this.state.value}
                        {...inputProps}
                    />
                </MdcTextField>
                <FormFieldHelperText error={error} helperText={helperText} />
            </React.Fragment>
        );
    }
}

TextField.propTypes = {
    /** Focuses on Input field on load if set */
    autoFocus: PropTypes.bool,
    /** Ability to add additional className to the component for addistional styling from parent */
    className: PropTypes.string,
    /** sets the state of the checkbox to disabled */
    disabled: PropTypes.bool,
    /** Enables dense variant. */
    dense: PropTypes.bool,
    /** Error to be displayed for this field */
    error: PropTypes.string,
    /** An optional class added to the floating label element of the text field. */
    floatingLabelClassName: PropTypes.string,
    /** Enables fullWidth variant. */
    fullWidth: PropTypes.bool,
    /** Helper text to be displayed for this field */
    helperText: PropTypes.string,
    /** The id attribute for the input */
    id: PropTypes.string,
    /** Additional props to be added to the input element */
    inputProps: PropTypes.shape({
        /** HTML tag to be used to render input element. 'input' (default) or 'textarea'. */
        inputType: PropTypes.string,
        /** Classes to be applied to the input element. */
        className: PropTypes.string,
        /** Disables the input and the parent text field. */
        disabled: PropTypes.func,
        /** The text field foundation. */
        foundation: PropTypes.func,
        /** A callback function to update React Text Field's value. */
        handleValueChange: PropTypes.func,
        /** If set, this value will override the native input's validation. */
        isValid: PropTypes.bool,
        /** Blur event handler. */
        onBlur: PropTypes.func,
        /** Change event handler. */
        onChange: PropTypes.func,
        /** Focus event handler. */
        onFocus: PropTypes.func,
        /** Mouse down event handler. */
        onMouseDown: PropTypes.func,
        /** Touch start event handler. */
        onTouchStart: PropTypes.func,
        /** Callback function that is called when the disabled prop updates. */
        setDisabled: PropTypes.func,
        /** Callback function that is called when the id attribute updates. */
        setInputId: PropTypes.func,
        /** Callback function that is called when focus or blur events occur */
        handleFocusChange: PropTypes.func,
        /** On mount of component, will call passed function with the instance of the <Input />. */
        ref: PropTypes.func,
    }),
    /** Whether the direction of the text field element is set to RTL. */
    isRtl: PropTypes.bool,
    /** Label text that appears as the floating label or placeholder. */
    label: PropTypes.string.isRequired,
    /** An icon element that appears as the leading icon. */
    leadingIcon: PropTypes.node,
    /** An optional class added to the line ripple element. */
    lineRippleClassName: PropTypes.string,
    /** The name attribute for the input of the checkbox */
    name: PropTypes.string,
    /** An optional class added to the notched outline element. */
    notchedOutlineClassName: PropTypes.string,
    /** Callback function when text field has changes. */
    onChange: PropTypes.func,
    /** Enables outlined variant. */
    outlined: PropTypes.bool,
    /** Enables textarea variant. */
    textarea: PropTypes.bool,
    /** An icon element that appears as the trailing icon. */
    trailingIcon: PropTypes.node,
    /** type attribute for the input field */
    type: PropTypes.string,
    /** The value attribute for the input element */
    value: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.number,
        PropTypes.string,
    ]),
};

TextField.defaultProps = {
    onChange: () => null,
    value: '',
};
