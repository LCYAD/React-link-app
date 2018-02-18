import * as React from 'react';
import './addlinkform.css';
import { Redirect } from 'react-router-dom';

interface AddLinkFormProps {
    addLink: Function;
}

interface AddLinkFormState {
    titlevalue: string;
    urlvalue: string;
    tagsvalue: string;
    titlevalid: boolean;
    urlvalid: boolean;
    tagsvalid: boolean;
    fireRedirect: boolean;
}

class AddLinkForm extends React.Component <AddLinkFormProps, AddLinkFormState> {

    constructor(props: AddLinkFormProps){
        super(props);
        this.state = {
            titlevalue: '',
            urlvalue: '',
            tagsvalue: '',
            titlevalid: false,
            urlvalid: false,
            tagsvalid: false,
            fireRedirect: false
        }
        this.submitForm = this.submitForm.bind(this);
        this.titleValidator = this.titleValidator.bind(this);
        this.urlValidator = this.urlValidator.bind(this);
        this.tagsValidator = this.tagsValidator.bind(this);
    }

    submitForm(e: any): void {
        e.preventDefault();
        if (this.state.urlvalid && this.state.titlevalid && this.state.tagsvalid) {
            let tags: string[] = [];
            let tempStr = this.state.tagsvalue.replace(/[^\w\d#]/g, "");
            tempStr.split("#").map((item, index)=>{
              if (index != 0){
                tags.push(item);
              }
            });
            this.props.addLink(this.state.titlevalue, this.state.urlvalue, tags);
            this.setState({fireRedirect: true});
        }
        
    }

    titleValidator(e: any){
        this.setState({titlevalue: e.target.value});
        if (!e.target.value.length) {
            if (this.state.titlevalid) {
                this.setState({titlevalid: false});
            }
        } else {
            if (!this.state.titlevalid) {
                this.setState({titlevalid: true});
            }
        }
    }

    urlValidator(e: any){
        this.setState({urlvalue: e.target.value});
        if (!e.target.value.length) {
            if (this.state.urlvalid) {
                this.setState({urlvalid: false});
            }
        } else {
            if (!this.state.urlvalid) {
                this.setState({urlvalid: true});
            }
        }
    }

    tagsValidator(e: any){
        this.setState({tagsvalue: e.target.value});
        if (!/#{1}\w{1,}\d{0,}/.test(e.target.value)) {
            if (this.state.tagsvalid) {
                this.setState({tagsvalid: false});
            }
        } else {
            if (!this.state.tagsvalid) {
                this.setState({tagsvalid: true});
            }
        }
    }


    render() {

        let titlewarning = null;
        let urlwarning = null;
        let tagswarning = null;

        const { fireRedirect } = this.state

        if (!this.state.titlevalid){
            titlewarning = <div className="form-warning"> Please input a title </div>
        } else { tagswarning = null; }

        if (!this.state.urlvalid){
            urlwarning = <div className="form-warning"> Please input an url </div>
        } else { tagswarning = null; }

        if (!this.state.tagsvalid){
            tagswarning = <div className="form-warning"> Invalid Input! Start with a #</div>
        } else { tagswarning = null; }   

        return (
        <div id="form-box">
            <div id="add-title"> Add a New Link </div>
            <hr/>
            <form onSubmit={this.submitForm}>
                <label><i>Title</i></label>
                <input className="form-input" type="text" placeholder="Enter Title"
                value={this.state.titlevalue} onChange={this.titleValidator} />
                {titlewarning}
                <label><i>URL</i></label>
                <input className="form-input" type="text" placeholder="Enter the link of the website"
                value={this.state.urlvalue} onChange={this.urlValidator}/>
                {urlwarning}
                <label><i>Tags</i></label>
                <input className="form-input" type="text" placeholder="Enter Tags starting with #" 
                value={this.state.tagsvalue} onChange={this.tagsValidator}/>
                {tagswarning}
                <input id="submit-btn"type="submit" value="Submit" />
            </form>

            {fireRedirect && (
                <Redirect to={'/'}/>
            )}
        </div>
        );
    }
}

export default AddLinkForm;
