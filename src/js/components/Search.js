import React from 'react';

class Search extends React.Component {

	constructor(props) {
        super(props);
		this._onChange   = this._onChange.bind(this);
    }

    _onChange(event) {
    	var val = event.target.value;
    	this.props.setSearchFilter(val);
	}

    render() {

    	if (this.props.cuts.length > 0) {

    		return(
    		<div className="container search">
    			<div>Filter by:</div>
    			<div>
    			<input 
					type        = "text" 
					className   = "form-control" 
					placeholder = "Search" 
					onChange    = {this._onChange} />
				</div>
    		</div>
    		);

    	} else {
    		return (<div></div>);
    	}

    }

}


export default Search;