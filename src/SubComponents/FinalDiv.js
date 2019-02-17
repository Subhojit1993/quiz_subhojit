import React, { Component } from 'react';
import getQuestions from '../JSON/getQuestions';
import { PieChart, Pie, Sector, Cell } from 'recharts';

class FinalDiv extends Component {

	constructor(props) {
		super(props);
		this.state = {
			getAnswers: [],
			getObj: {}
		};
	}

	componentDidMount() {
		let getAnswers = [];
		if(localStorage.getItem("answers_subhojit_101")) {
			getAnswers = JSON.parse(localStorage.getItem("answers_subhojit_101") || "[]");
		}
		this.setState({ getAnswers });
		let correctAnswerCount = 0;
		let incorrectAnswerCount = 0;
		let noAnswersCount = 0;

		if(getAnswers && getAnswers.length > 0) {
			getQuestions.map((question, index) => {
				getAnswers.map((answer, get_index) => {
					if(question.id === answer.question_id) {
						if(question.answer.id == answer.option_id) {
							correctAnswerCount+=1;
						}
						else {
							incorrectAnswerCount+=1;
						}
					}
				})
			})
		}

		let total_count = correctAnswerCount + incorrectAnswerCount;

		noAnswersCount = getQuestions.length - total_count;

		let getObj = {
			correctAnswerCount: correctAnswerCount,
			incorrectAnswerCount: incorrectAnswerCount,
			noAnswersCount: noAnswersCount
		};

		this.setState({ getObj, getAnswers });
	}

	render() {

		let getResults = '';
		let isButton = '';
		var COLORS = [];
		var data = [];
		if(this.state.getObj.correctAnswerCount > 0) {
			let color_1 = '#E94041';
			COLORS = COLORS.concat(color_1);
			let obj_i = {
				name: 'Correct',
				value: this.state.getObj.correctAnswerCount
			};
			data = data.concat(obj_i);
		}
		if(this.state.getObj.incorrectAnswerCount > 0) {
			let color_2 = '#00C49F';
			COLORS = COLORS.concat(color_2);
			let obj_i = {
				name: 'Incorrect',
				value: this.state.getObj.incorrectAnswerCount
			};
			data = data.concat(obj_i);
		}
		if(this.state.getObj.noAnswersCount > 0) {
			let color_3 = '#F6BB33';
			COLORS = COLORS.concat(color_3);
			let obj_i = {
				name: 'NoAnswers',
				value: this.state.getObj.noAnswersCount
			};
			data = data.concat(obj_i);
		}
		const RADIAN = Math.PI / 180;
		const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
		 	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
		  	const x  = cx + radius * Math.cos(-midAngle * RADIAN);
		  	const y = cy  + radius * Math.sin(-midAngle * RADIAN);
		 
		  	return (
		    	<text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
		    		{`${(percent * 100).toFixed(0)}%`}
		    	</text>
		  	);
		};

		// Pie chart added as required

		let getPieChart = (
			<PieChart width={220} height={250}>
		        <Pie
		          data={data} 
		          cx={100} 
		          cy={100} 
		          labelLine={false}
		          label={renderCustomizedLabel}
		          outerRadius={80} 
		          fill="#8884d8"
		        >
		          {
		          	data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
		          }
		        </Pie>
		    </PieChart>
		);

		// Question - given answer and actual answers added as required
		// Given answers are shown by keeping the options checked

		if(getQuestions.length > 0) {
			getResults = getQuestions.map((question, index) => {

				let is_text = question.answer.text;
				let isCorrect = false;
				let getQuestionId = '';
				
				let getOptions = question.options.map((option, get_index) => {

					let isChecked = false;
					
					if(this.state.getAnswers && this.state.getAnswers.length > 0) {
						this.state.getAnswers.map((ans, l_index) => {
							if(ans.option_id === option.id) {
								isChecked = true;

								if(ans.question_id === question.id) {
									if(ans.option_id === question.answer.id) {
										isCorrect = true;
									}
									getQuestionId = ans.question_id;
								}
							}
						})
					}

					if(getQuestionId === '') {
						isButton = (
							<button
								type="button"
								className="sky_button font_family"
								disabled={true}
							>
									Blank!
							</button>
						);
					}
					else {
						if(isCorrect) {
							isButton = (
								<button
									type="button"
									className="sky_button font_family"
									disabled={true}
								>
									Correct!
								</button>
							);
						}
						else {
							isButton = (
								<button
									type="button"
									className="sky_button font_family"
									disabled={true}
								>
									Incorrect Answer!
								</button>
							);
						}
					}

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
								checked={isChecked} 
								name={"subho_11" + index}
								disabled={true}
							/>
							<span className="checkmark_11"></span>
						</label>
					);
				});

				return(
					<div key={question.id} className="mobile_margin_top_20">
						<h5 className="font_family font_16 font_weight_600 left_align margin_bottom_30">
							{question.name}
						</h5>
						<div className="margin_bottom_40">
							{getOptions}
						</div>
						<div className="left_align mobile_flex margin_bottom_20">
							<div className="display_inline left_align">
								{isButton}
							</div>
							<div className="display_inline font_family font_16 margin_bottom_30 mobile_width_margin margin_left_101 left_align">
								<strong className="text_color_3">Actual Answer is</strong> - <strong>{is_text}</strong>
							</div>
						</div>
					</div>
				);
			})
		}

		return (
			<div className="final_div padding_50">
				<div className="row">
					<div className="col-sm-6 col-xs-6 mobile_width_50">
						<h5 className="font_family font_20 font_weight_600 left_align margin_bottom_30">
							Results Summary
						</h5>
					</div>
					<div className="col-sm-6 col-xs-6 mobile_width_50">
						<button
							type="button"
							className="red_button font_family"
							onClick={this.props.handleLogout}
						>
							Exit
						</button>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-3">
						{getPieChart}
					</div>
					<div className="col-sm-8 display_flex_111">
						<div>
							<table>
								<tr>
									<td className="padding_bottom_10">
										<hr className="legend_one legend_color_1" />
									</td>
									<td className="padding_bottom_10">
										<h5 className="font_family font_16 font_weight_600 left_align get_margin_102">
											Correct Answer
										</h5>
									</td>
								</tr>
								<tr>
									<td className="padding_bottom_10">
										<hr className="legend_one legend_color_2" />
									</td>
									<td className="padding_bottom_10">
										<h5 className="font_family font_16 font_weight_600 left_align get_margin_102">
											Incorrect Answer
										</h5>
									</td>
								</tr>
								<tr>
									<td className="padding_bottom_10">
										<hr className="legend_one legend_color_3" />
									</td>
									<td className="padding_bottom_10">
										<h5 className="font_family font_16 font_weight_600 left_align get_margin_102">
											Blank
										</h5>
									</td>
								</tr>
								<tr>
									<td className="padding_bottom_10">
										<h5 className="font_family font_16 font_weight_600 left_align get_margin_102 color_teal">
											
										</h5>
									</td>
									<td className="padding_bottom_10">
										<h5 className="font_family font_16 font_weight_600 left_align get_margin_102">
											Corrected - 
											<strong className="color_red margin_left_5 margin_right_5"> 
												{this.state.getObj.correctAnswerCount}
											</strong> 
											 / 
											<strong className="color_teal margin_left_5"> 
											 {getQuestions.length} 
											</strong>
										</h5>
									</td>
								</tr>
							</table>
						</div>
					</div>
				</div>
				{getResults}
			</div>
		);
	}
}

export default FinalDiv;

