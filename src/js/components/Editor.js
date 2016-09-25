import React from 'react';
import ReactDOM from 'react-dom';

class Editor extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
        	playing : false,
        	recording : false,
        	looping : false,
        	cut:{ start:-1, end:-1 }
        }

		this.video      = false;
		this.playIndex  = -1;

		this.getVideoElement = this.getVideoElement.bind(this);
		this.play            = this.play.bind(this);
		this.pause           = this.pause.bind(this);
		this.record          = this.record.bind(this);
		this.addCut          = this.addCut.bind(this);
		this.resetRecording  = this.resetRecording.bind(this);
		this.onTimeUpdate    = this.onTimeUpdate.bind(this);
		this.onPlaying       = this.onPlaying.bind(this);
		this.onPause         = this.onPause.bind(this);
		this.onEnded         = this.onEnded.bind(this);
		this.onEnded         = this.onEnded.bind(this);
		this.tooglePlay      = this.tooglePlay.bind(this);
		this.toogleRecord    = this.toogleRecord.bind(this);

    }

    getVideoElement() {
    	if (this.video === false) {
			var wraper = ReactDOM.findDOMNode( this );
			this.video = ReactDOM.findDOMNode( this.refs.video );
		}
		return this.video;
    }

    tooglePlay() {
    	(this.state.playing) ? this.pause() : this.play();
    }

    toogleRecord() {
    	(this.state.recording) ? this.pause() : this.record();
    }

    play() {
    	// play the video
    	const video = this.getVideoElement();
    	if (video.paused) {
    		video.play();
    		this.setState({playing:true});
    	} else {
    		// no need to do anything.
    	}
    }

    pause() {
    	// pause the video
    	const video = this.getVideoElement();
    	if (video.paused) {
    		// no need to do anything.
    	} else {
    		this.setState({playing:false, looping:false});
    		video.pause();
    		if (this.state.recording) {
    			this.setState({recording:false});
    			this.state.cut.end = video.currentTime;
    			this.addCut();
    		}
    	}
    }

    record() {
    	const video = this.getVideoElement();
    	(this.state.playing) ? "" : this.play();
    	// set the recording
    	this.setState({ recording:true, cut:{ start:video.currentTime, end:-1 } });
    }

    addCut() {
    	if (this.state.cut.start != -1 && this.state.cut.end != -1) {
    		// add the new cut
    		this.props.addCut(this.state.cut);
    		// reset the state
    		this.resetRecording();
    	}
    }

    resetRecording() {
    	this.setState({recording:false, cut:{ start:-1, end:-1 } });
    }

    onTimeUpdate(event) {
    	// console.log('onTimeUpdate', event.nativeEvent.target.currentTime);
    }

    onPlaying(event) {
    	this.setState({playing:true})
    	// console.log('playing', event.nativeEvent.target.currentTime);
    }

    onPause(event) {
    	this.setState({playing:false});
    	if (this.state.looping)
    		this.loadNext();
    	// console.log('onPause', event.nativeEvent.target.currentTime);
    }

    onEnded(event) {

    	if (this.state.recording) {
    		
			this.setState({recording:false});
			const video = this.getVideoElement();
			this.state.cut.end = video.currentTime;
			this.addCut();
    		
    		this.pause();
    		this.setState({looping:false})
    	} else {
    		// move to the next clip if we have one.
    		this.loadNext();
    	}
    	console.log('onEnded', event.nativeEvent.target.currentTime);
    }

    loadNext() {
    	// const index = this.currentCut + 1;
    	// this.loadSource(index);
    }

  //   loadSource(index) {
  //   	if (this.props.cuts.length > 0 && index < this.props.cuts.length) {
			
		// 	this.currentCut = index;
		// 	this.setState({looping:true});
		// 	// make sure the current/end time is set
		// 	var video = this.getVideoElement();
		// 	video.load();

		// 	this.play();
		// 	// video.currentTime = this.props.cuts[index].start;
		// }
  //   }


	componentWillUpdate(nextProps, nextState) {
		// console.log(nextProps, nextState);
		var index = nextProps.playIndex;
    	if (this.playIndex != index) {
			this.playIndex = index;	
			var video      = this.getVideoElement();
			video.load();
			this.play();
    	}
	}


    getSources() {

    	var index = this.playIndex

    	var url  = this.props.url;
		var type = this.props.type || 'video/mp4;codecs="avc1.42E01E, mp4a.40.2"';

		if (index > -1) {
			url = url + "#t=" + this.props.cuts[index].start + "," + this.props.cuts[index].end;
		}

    	const sources = [];
    	sources.push( <source src={url} type={type} key="video-src" /> );
    	return sources;
    }

    getController() {

		const play = this.state.playing ? "fa fa-pause" : "fa fa-play";
		const rec  = this.state.playing && this.state.recording ? "fa fa-pause" : "fa fa-circle";

    	return (
			<div className="video-controller center" >
				<button 
					onClick   = {this.tooglePlay}
					type      = "button" 
					className = "btn btn-circle btn-lg"
				>
					<i className={play} aria-hidden="true"></i>
				</button>
				<button
					onClick   = {this.toogleRecord} 
					type      = "button"
					className = "btn btn-circle btn-record btn-lg"
				>
					<i className={rec} aria-hidden="true"></i>
				</button>
			</div>
		);
    }

    render() {
        
		const sources    = this.getSources();
		const controller = this.getController();

    	/* media events
    	onAbort onCanPlay onCanPlayThrough onDurationChange onEmptied onEncrypted onEnded onError onLoadedData onLoadedMetadata onLoadStart onPause onPlay onPlaying onProgress onRateChange onSeeked onSeeking onStalled onSuspend onTimeUpdate onVolumeChange onWaiting

    	controls autoPlay
    	*/

        return (
        	<div>
	        	<video 
	        		className    = "video-player"
					ref          = "video"
					onPlay       = {this.onPlaying}
					onTimeUpdate = {this.onTimeUpdate}
					onPause      = {this.onPause}
					onEnded      = {this.onEnded}
	        	>
				  {sources}
				</video>
				{controller}
			</div>
    	);

    }

}

export default Editor;