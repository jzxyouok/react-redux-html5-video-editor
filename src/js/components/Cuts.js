import React from 'react';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import Cut from "./Cut";


class Cuts extends React.Component {

	 constructor(props) {
        super(props);
    }

    hasTag(tags, filter) {
        if (tags.length > 0) {
            for (var i = 0; i < tags.length; i++) {
                if (tags[i].indexOf(filter) !== -1)
                    return true;
            };
        }
        return false;
    }

    render() {

        const filter = this.props.filter;
    	const rows = [];
        if (this.props.cuts.length > 0) {
            for (var i = this.props.cuts.length-1; i > -1; i--) {
                if (filter.length > 0) {
                    if (!this.hasTag(this.props.cuts[i].tags, filter)) 
                        continue;
                }
                const key = this.props.cuts[i].start + "_" + this.props.cuts[i].end;
        		rows.push(<Cut 
                    key          = {key} 
                    id           = {i}
                    cutId        = {i}
                    item         = {this.props.cuts[i]}
                    playIndex    = {this.props.playIndex}
                    setPlayIndex = {this.props.setPlayIndex}
                    deleteCut    = {this.props.deleteCut}
                    setTags      = {this.props.setTags} />)
        	};
        }

    	return (
    		<div className="video-cuts">
    			<ReactCSSTransitionGroup 
						transitionName          ="fade" 
						transitionEnterTimeout  ={500} 
						transitionLeaveTimeout  ={300}
						transitionAppear        ={true} 
						transitionAppearTimeout ={500}
			        >
					{rows}
				</ReactCSSTransitionGroup>
    		</div>
    	);
    }

}


export default Cuts;