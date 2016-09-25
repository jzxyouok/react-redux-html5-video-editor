import React from 'react';
import TagInput from "./TagInput";

class Cut extends React.Component {

	constructor(props) {
        super(props);
        this.playing    = false;
        this.tooglePlay = this.tooglePlay.bind(this);
        this.trash      = this.trash.bind(this);
        this.updateTags = this.updateTags.bind(this);
    }

    tooglePlay() {
        if (this.playing) {
            this.playing = false;
        } else {
            this.playing = true;
        }
        this.props.setPlayIndex(this.props.cutId);
    }

    trash() {
        this.props.deleteCut(this.props.cutId);
    }

    updateTags(tags) {
        this.props.setTags(this.props.cutId, tags);
    }

    render() {

        const icon     = this.props.playIndex == this.props.cutId ? "fa fa-pause" : "fa fa-play";
        const name     = this.props.item.title ? this.props.item.title : "Cut " + (this.props.cutId + 1);
        const tags     = this.props.item.tags.length > 0 ? this.props.item.tags : [];
        const start    = this.props.item.start.toFixed(2);
        const end      = this.props.item.end.toFixed(2);
        const duration = (end - start).toFixed(2);

    	return (
                <div className="video-cut-wrapper container-fluid" >
            		<div className="video-cut clearfix">
                        
                            <div className="pull-left">
                                <button
                                    onClick   = {this.tooglePlay} 
                                    type      = "button"
                                    className = "btn btn-circle"
                                >
                                    <i className={icon} aria-hidden="true"></i>
                                </button>
                            </div>
                            <div className="pull-left">
                                <h4>{name}</h4>
                    			<small>{duration}s | {start}s - {end}s</small>
                            </div>

                            <div className="pull-right action">
                                <button
                                    onClick   = {this.trash} 
                                    type      = "button"
                                    className = "btn btn-circle btn-trash"
                                >
                                    <i className="fa fa-trash" aria-hidden="true"></i>
                                </button>
                            </div>
                    
            		</div>

                    <div className="video-tags clearfix">
                        <TagInput tags={tags} onUpdate={this.updateTags} placeholder="Add tags" />
                    </div>

                </div>
                

    	);
    }

}


export default Cut;