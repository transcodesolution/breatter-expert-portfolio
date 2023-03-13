import React from "react";

import Container from 'react-bootstrap/Container';

import Select from 'react-select';
import Table from 'react-bootstrap/Table';

import answer_rating from '../../Assets/images/answer_rating.png';
import answer_like from '../../Assets/images/answer_like.png';

const Answer = () =>{

    const options = [
        { value: 'january', label: 'january ' },
        { value: 'february', label: 'february' },
        { value: 'march', label: 'march' },
        { value: 'april', label: 'april' },
        { value: 'may', label: 'may' },
        { value: 'june', label: 'june' },
        { value: 'july', label: 'july' },
        { value: 'august', label: 'august' },
        { value: 'september', label: 'september' },
        { value: 'october ', label: 'october' },
        { value: 'november', label: 'november' },
        { value: 'december', label: 'december' },
      ]

      const options1 = [
        { value: '2011', label: '2011' },
        { value: '2012', label: '2012' },
        { value: '2013', label: '2013' },
        { value: '2014', label: '2014' },
        { value: '2015', label: '2015' },
        { value: '2016', label: '2016' },
        { value: '2017', label: '2017' },
        { value: '2018', label: '2018' },
        { value: '2019', label: '2019' },
        { value: '2020', label: '2020' },
      ]

    return(
        <div className="answer_wrapper">
            <Container>
                <div className="answer_wrap">
                    <div className="answer_block">
                        <div className="answer_title">
                            <h2>Filters</h2>
                        </div>
                        <ul className="answer_sec">
                            <li>
                                <div className="answer_input">
                                    <input type="text" placeholder="Today" />
                                </div>
                            </li>
                            <li>
                                <div className="terms_condition_select">
                                    <Select options={options} />
                                </div>
                            </li>
                            <li>
                                <div className="terms_condition_select">
                                    <Select options={options1} />
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="answer_table">
                        <Table responsive="xl">
                            <thead>
                                <tr>
                                    <th>Question</th>
                                    <th>Answer</th>
                                    <th>Rating</th>
                                    <th>Student Rating</th>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at massa maximus, .  hendrer leo ?</p>
                                        </td>
                                        <td>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at massa maximus, .  hendrer leo ?</p>
                                        </td>
                                        <td>
                                            
                                        </td>
                                        <td>
                                            <img src={answer_like} alt="answer" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at massa maximus, .  hendrer leo ?</p>
                                        </td>
                                        <td>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at massa maximus, .  hendrer leo ?</p>
                                        </td>
                                        <td>
                                            <img src={answer_rating} alt="answer_rating" />
                                        </td>
                                        <td>
                                            <img src={answer_like} alt="answer" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at massa maximus, .  hendrer leo ?</p>
                                        </td>
                                        <td>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at massa maximus, .  hendrer leo ?</p>
                                        </td>
                                        <td>
                                            
                                        </td>
                                        <td>
                                            <img src={answer_like} alt="answer" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at massa maximus, .  hendrer leo ?</p>
                                        </td>
                                        <td>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at massa maximus, .  hendrer leo ?</p>
                                        </td>
                                        <td>
                                            
                                        </td>
                                        <td>
                                            <img src={answer_like} alt="answer" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at massa maximus, .  hendrer leo ?</p>
                                        </td>
                                        <td>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at massa maximus, .  hendrer leo ?</p>
                                        </td>
                                        <td>
                                             <img src={answer_rating} alt="answer_rating" />
                                        </td>
                                        <td>
                                            <img src={answer_like} alt="answer" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at massa maximus, .  hendrer leo ?</p>
                                        </td>
                                        <td>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at massa maximus, .  hendrer leo ?</p>
                                        </td>
                                        <td>
                                            
                                        </td>
                                        <td>
                                            <img src={answer_like} alt="answer" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at massa maximus, .  hendrer leo ?</p>
                                        </td>
                                        <td>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at massa maximus, .  hendrer leo ?</p>
                                        </td>
                                        <td>
                                            
                                        </td>
                                        <td>
                                            <img src={answer_like} alt="answer" />
                                        </td>
                                    </tr>
                                </tbody>
                        </Table>
                    </div>
                    <div className="answer_btn">
                        <a href="#0">See More</a>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Answer;