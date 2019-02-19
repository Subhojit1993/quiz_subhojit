import React, { Component } from 'react';
import '../Questions.css';
import '../App.css';
import getQuestions from '../JSON/getQuestions';
import Countdown from 'react-countdown-now';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const Completionist = () => <span>Test over!</span>;

class QuestionSet extends Component {

	constructor(props) {
		super(props);
		this.state = {
			counter: 0,
			getArr: [],
			option_id: '',
			isFlag: false,
			getOption: '',
			question_id: '',
			isDialog: false,
			futureTime: '',
			timeRemaining: ''
		};
	}

	componentDidMount() {
		let futureTime = Date.now() + 180000;
		this.setState({ futureTime });
	}

	handleRadioChange = (e, option_id, question_id) => {
		this.setState({ option_id, question_id });
	};

	handleQuestionChange = (e) => {
		let arr = this.state.getArr;
		let getOption = this.state.option_id;

		// handling the questions and had a set timeout for showing success and incorrect answers in the interval as required
		
		if(this.state.option_id != '') {
			let obj = {
				question_id: this.state.question_id,
				option_id: this.state.option_id
			};
			arr = arr.concat(obj);
			localStorage.setItem("answers_subhojit_101", JSON.stringify(arr));
			let getCounter = this.state.counter;
			getCounter+=1;
			let timeRemaining = this.state.futureTime - Date.now();
			this.setState({ getOption, timeRemaining });
			setTimeout(
			    function() {
			        this.setState({	counter: getCounter, option_id: '', isFlag: false, getArr: arr, getOption: '' });
			        if(getCounter === getQuestions.length) {
						this.props.setFinalDiv();
					}
			    }
			    .bind(this),
			    750
			);
		}
		else {
			this.setState({ isFlag: true });
		}
	};

	handleComplete = (e) => {
		this.setState({
			isDialog: true
		});
	};

	handleDialogMsg = (e) => {
		let obj = {
			isFinished: true
		};
		// localstorage has been used as the storage here to get the answers from the users and show them in the results section
		localStorage.setItem("timeFinished_subhojit_101", JSON.stringify(obj));
		this.setState({
			isDialog: false
		});
		this.props.setFinalDiv();
	};

	render() {

		// console.log("Questions", getQuestions);

		let setWarning = '';
		let isButton = '';
		let isDisabled = false;

		const ok_action = [
	    	<FlatButton
	      		className="dialog-action-buttons"
	        	label="OK"
	        	primary={true}
	        	onClick={this.handleDialogMsg}
	      	/>,
	    ];

		if(this.state.isFlag) {
			setWarning = (
				<h5 className="font_family font_15 font_weight_400 left_align color_red margin_10_0">
					Warning: Please select an option from above!
				</h5>
			);
		}

		// Questions mapped and taken from the dataset getData in JSON folder

		let getSet = getQuestions.map((question, index) => {

			if(index === this.state.counter) {

				if(this.state.getOption != '') {

					isDisabled = true;

					if(question.answer.id == this.state.getOption) {
						isButton = (
							<button
								type="button"
								className="sky_button font_family"
								disabled={true}
							>
								Success!
							</button>
						);
					}
					else {
						isButton = (
							<button
								type="button"
								className="sky_button font_family button_width_center"
								disabled={true}
							>
								Incorrect Answer!
							</button>
						);
					}
				}

				// Customized radio buttons are used as required

				let getOptions = question.options.map((option, get_index) => {
					return(
						<label
							key={option.id}
							className="container_11 left_align"
						>
							<h5 className="font_family font_15 custom_margin_1">
								{option.text}
							</h5>
							<input 
								type="radio" 
								name="subho_111"
								disabled={isDisabled}
								onChange={(e) => this.handleRadioChange(e, option.id, question.id)} 
							/>
							<span className="checkmark_11"></span>
						</label>
					);
				});
				

				return(
					<div key={question.id}>
						<h5 className="font_family font_16 font_weight_600 left_align margin_bottom_30 color_teal">
							{question.name}
						</h5>
						<div className="margin_bottom_40">
							{getOptions}
							{setWarning}
						</div>
						<div className="row">
							<div className="left_align">
								<button
									type="submit"
									className="light_violet font_family"
									disabled={isDisabled}
									onClick={this.handleQuestionChange}
								>
									Submit Answer
								</button>
							</div>
							<div className="col-sm-6 left_align">
								{isButton}
							</div>
						</div>
					</div>
				);
			}
		})

		// Countdown timer set, time limit set

		let countedTime = this.state.futureTime;

		if(this.state.timeRemaining != '') {
			countedTime = Date.now() + this.state.timeRemaining;
		}

		return (
			<div>
				<div className="questions_card padding_50">
					{getSet}
				</div>
				<Countdown date={this.state.futureTime} onComplete={this.handleComplete}>
					<Completionist />
				</Countdown>
				<Dialog
					actions={ok_action}
					modal={true}
					open={this.state.isDialog}
					onRequestClose={this.handleDialogMsg}
					actionsContainerClassName="dialog-actions-container"
					contentClassName="dialog-content-class"
					bodyClassName="dialog-body-class"
				>
					Test time is finished!
				</Dialog>
			</div>
		);
	}
}

export default QuestionSet;

