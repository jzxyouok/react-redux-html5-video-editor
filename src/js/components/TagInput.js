import React from 'react';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';

/**
 * TagInput object
 * import TagInput from "./TagInput";
 *
 * basic use
 * render( 
 * 	<TagInput />,
 * 	document.getElementById('exp') 
 * 	);
 *
 * set the input type id or class
 * render( 
 * 	<TagInput type="email" id="email" _class="some-class" />,
 * 	document.getElementById('exp') 
 * 	);
 *
 * set your tags on load	
 * const tags = ["one", "two", "three", "four"]
 *
 * render( 
 * 	<TagInput tags={tags} />,
 * 	document.getElementById('exp') 
 * 	);
 *
 *
 * listen when updates are made.
 * function onUpdate(tags) {
 * 	console.log('onUpdate', tags);
 * }
 *
 * render( 
 * 	<TagInput onUpdate={onUpdate} />,
 * 	document.getElementById('exp') 
 * 	);
 * 	
 */
export default class TagInput extends React.Component {

	constructor() {
		super();

		this.state = {
			type  : "text",
			focus : false,
			tags  : [],
			text  : ''
		};
		
		this._getInput         = this._getInput.bind(this);
		this._onChange         = this._onChange.bind(this);
		this._catchEnter       = this._catchEnter.bind(this);
		this._onFocus          = this._onFocus.bind(this);
		this._onBlur           = this._onBlur.bind(this);
		this._getTags          = this._getTags.bind(this);
		this._addTag           = this._addTag.bind(this);
		this._removeTag        = this._removeTag.bind(this);
		this._removeTagByIndex = this._removeTagByIndex.bind(this);
		this._isTag            = this._isTag.bind(this);
		this._validateEmail    = this._validateEmail.bind(this);

    }

    componentDidMount() {
        if (this.props.tags)
        	this.setState({tags:this.props.tags});
    }


    _update(tags = false) {
    	if (this.props.onUpdate) {
    		const t = tags != false ? tags : this.state.tags;
    		this.props.onUpdate(t);
    	}
    }

    _isTag(val) {
    	for (var i = 0; i < this.state.tags.length; i++) {
    		if (this.state.tags[i].toLowerCase() === val.toLowerCase())
    			return true;
    	};
    	return false;
    }

    _getIndex(val) {
    	for (var i = 0; i < this.state.tags.length; i++) {
    		if (this.state.tags[i].toLowerCase() === val.toLowerCase())
    			return i;
    	};
    	return -1;
    }

    _addTag(val) {
		if (!this._isTag(val)) {

			if (this.props.type && this.props.type === 'email') {
				if (!this._validateEmail(val))
					return false;
			}

			var tags = [...this.state.tags];
			tags = tags.concat([val]);
			this.setState({tags:tags});
			this._update(tags);
		}
    }

    _removeTag(val) {
    	var index = this._getIndex(val);
    	if (index > -1) 
    		this._removeTagByIndex(index);
    }

    _removeTagByIndex(index) {
    	var tags = [
    		...this.state.tags.slice(0, index),
    		...this.state.tags.slice(index + 1),
    	];
   		this.setState({tags:tags});
   		this._update(tags);
    }

    _validateEmail(val) {
    	var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		return filter.test(val);
    }

    _getInput() {

		let _class       = this.props._class  ? this.props._class : ""; 
		let _type        = this.props.type ? this.props.type : this.state.type; 
		let _id          = this.props.id ? this.props.id : ""; 
		let _placeholder = this.props.placeholder ? this.props.placeholder : ""; 

    	return (
			 <input 
				value       = {this.state.text} 
				type        = {_type} 
				className   = {_class} 
				id          = {_id}
				placeholder = {_placeholder} 
				onChange    = {this._onChange}
				onKeyDown   = {this._catchEnter}
				onFocus     = {this._onFocus}
				onBlur      = {this._onBlur} />
		);

    }

    _getTags() {

    	let rows = [];
		if (this.state.tags) {
			this.state.tags.map((item, index) => {
				rows.push(<span 
					className = "tag"
					key       = {index}
					>
						{item}
						<button 
							className = "remove"
							onClick   = {
								this._removeTagByIndex.bind(this, index)
							}
							>&times;
						</button>
					</span>);
			});
		}

		if (rows.length > 0) {
			return (
				<div className="messages-list">
					<ReactCSSTransitionGroup 
						transitionName          = "fade" 
						transitionEnterTimeout  = {500} 
						transitionLeaveTimeout  = {300}
						transitionAppear        = {true} 
						transitionAppearTimeout = {500}
			        >
					{rows}
					</ReactCSSTransitionGroup>
				</div>
			);
		}

		return "";
    }

    _onChange(event) {
    	this.setState({text: event.target.value});
	}

	_catchEnter(event) {
		var val = event.target.value;
		if (event.keyCode === 13 && val.length > 0) {
			this._addTag(val);
			this.setState({text: ""});
		}
	}

	_onFocus(event) {
		this.setState({ focus: true });
	}

	_onBlur(event) {
		this.setState({ focus: false });
	}

    render() {

		var tags  = this._getTags();
		var input = this._getInput();

    	var c = "react-tag-input";
    	if (this.state.focus == true)
    		c += " focus";

    	return(
    		<div className={c}>
	    		{tags}{input}
    		</div>
    	);
    }

}