import React from 'react';

import Editor from "./Editor";
import Cuts from "./Cuts";
import Search from "./Search";

const Main = React.createClass({
	render() {
		return (
			<div className="video-editor">
				<Editor {...this.props} />
				<Cuts {...this.props} />
				<Search {...this.props} />			
			</div>
		);
	}
});

export default Main;