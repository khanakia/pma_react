import React, { Component } from 'react'
import { Link } from 'react-router'
import ReactDOM from 'react-dom'

import Sidebar from '../components/Sidebar'
import PagePanel from '../components/PagePanel'

// import LogoForm from '../components/UploadPopupForm'

import {ROOT_URL} from '../config.js'

export default class LayoutUpload extends Component {

    static defaultProps = {
        onDataUpdate: function(org) {},

        data : {
            id: '',
            url: '',
        }
    }

    componentDidMount() {
        var CommandBarElements = document.querySelectorAll(".ms-CommandBar");
        for(var i = 0; i < CommandBarElements.length; i++) {
            new fabric['CommandBar'](CommandBarElements[i]);
        }
    }
    openPopuplogo() {
        // LogoForm.showInPoup();
        return false;
    }

    render() {
        return (
            <div>
                <Sidebar>
                    Sidebar
                </Sidebar>
                <PagePanel hasSidebar="true">
                     
<div className="ms-CommandBar ">
    <div className="ms-CommandBar-sideCommands">
        
<div className="ms-CommandButton  ms-CommandButton--noLabel  ">
  <button className="ms-CommandButton-button"  >
      <span className="ms-CommandButton-icon ms-fontColor-themePrimary"><i className="ms-Icon ms-Icon--CircleRing"></i></span><span className="ms-CommandButton-label"></span>  </button>
</div>
    </div>
  <div className="ms-CommandBar-mainArea">
      

<div className="ms-SearchBox  ms-SearchBox--commandBar  ">
  <input className="ms-SearchBox-field" type="text" defaultValue="sdfS" />
  <label className="ms-SearchBox-label">
    <i className="ms-SearchBox-icon ms-Icon ms-Icon--Search"></i>
    <span className="ms-SearchBox-text">Search</span>
  </label>
  
<div className="ms-CommandButton ms-SearchBox-clear ms-CommandButton--noLabel  ">
  <button className="ms-CommandButton-button"  >
      <span className="ms-CommandButton-icon "><i className="ms-Icon ms-Icon--Cancel"></i></span><span className="ms-CommandButton-label"></span>  </button>
</div>
  
<div className="ms-CommandButton ms-SearchBox-exit ms-CommandButton--noLabel  ">
  <button className="ms-CommandButton-button"  >
      <span className="ms-CommandButton-icon "><i className="ms-Icon ms-Icon--ChromeBack"></i></span><span className="ms-CommandButton-label"></span>  </button>
</div>
  
<div className="ms-CommandButton ms-SearchBox-filter ms-CommandButton--noLabel  ">
  <button className="ms-CommandButton-button"  >
      <span className="ms-CommandButton-icon "><i className="ms-Icon ms-Icon--Filter"></i></span><span className="ms-CommandButton-label"></span>  </button>
</div>
</div>
      
<div className="ms-CommandButton    ">
  <button className="ms-CommandButton-button"  >
      <span className="ms-CommandButton-icon ms-fontColor-themePrimary"><i className="ms-Icon ms-Icon--CircleRing"></i></span><span className="ms-CommandButton-label">Command</span>  </button>
</div>
      
<div className="ms-CommandButton    ">
  <button className="ms-CommandButton-button"  >
      <span className="ms-CommandButton-icon ms-fontColor-themePrimary"><i className="ms-Icon ms-Icon--CircleRing"></i></span><span className="ms-CommandButton-label">New</span><span className="ms-CommandButton-dropdownIcon"><i className="ms-Icon ms-Icon--ChevronDown"></i></span>
  </button>
    
<ul className="ms-ContextualMenu  is-opened ms-ContextualMenu--hasIcons">
      <li className="ms-ContextualMenu-item ">
        <a className="ms-ContextualMenu-link " tabIndex="1" >Folder</a>
        <i className="ms-Icon ms-Icon--Folder "></i>
      </li>
      <li className="ms-ContextualMenu-item ms-ContextualMenu-item--divider"></li>
      <li className="ms-ContextualMenu-item ">
        <a className="ms-ContextualMenu-link " tabIndex="1" >Plain Text Document</a>
        <i className="ms-Icon ms-Icon--Page "></i>
      </li>
      <li className="ms-ContextualMenu-item ">
        <a className="ms-ContextualMenu-link " tabIndex="1" >A Coffee</a>
        <i className="ms-Icon ms-Icon--Coffee "></i>
      </li>
      <li className="ms-ContextualMenu-item ">
        <a className="ms-ContextualMenu-link " tabIndex="1" >Picture</a>
        <i className="ms-Icon ms-Icon--Picture "></i>
      </li>
      <li className="ms-ContextualMenu-item ">
        <a className="ms-ContextualMenu-link " tabIndex="1" >Money</a>
        <i className="ms-Icon ms-Icon--Money "></i>
      </li>
</ul>
</div>
      
<div className="ms-CommandButton    ">
  <button className="ms-CommandButton-button"  >
      <span className="ms-CommandButton-icon ms-fontColor-themePrimary"><i className="ms-Icon ms-Icon--CircleRing"></i></span><span className="ms-CommandButton-label">Command</span>  </button>
</div>
      
<div className="ms-CommandButton    ">
  <button className="ms-CommandButton-button"  >
      <span className="ms-CommandButton-icon ms-fontColor-themePrimary"><i className="ms-Icon ms-Icon--CircleRing"></i></span><span className="ms-CommandButton-label">Command</span>  </button>
</div>
      
<div className="ms-CommandButton    ">
  <button className="ms-CommandButton-button"  >
      <span className="ms-CommandButton-icon ms-fontColor-themePrimary"><i className="ms-Icon ms-Icon--CircleRing"></i></span><span className="ms-CommandButton-label">Command</span>  </button>
</div>
      
        
<div className="ms-CommandButton ms-CommandBar-overflowButton ms-CommandButton--noLabel  ">
  <button className="ms-CommandButton-button"  >
      <span className="ms-CommandButton-icon "><i className="ms-Icon ms-Icon--More"></i></span><span className="ms-CommandButton-label"></span>  </button>
    
<ul className="ms-ContextualMenu  is-opened ms-ContextualMenu--hasIcons">
      <li className="ms-ContextualMenu-item ">
        <a className="ms-ContextualMenu-link " tabIndex="1" >Folder</a>
        <i className="ms-Icon ms-Icon--Folder "></i>
      </li>
      <li className="ms-ContextualMenu-item ms-ContextualMenu-item--divider"></li>
      <li className="ms-ContextualMenu-item ">
        <a className="ms-ContextualMenu-link " tabIndex="1" >Plain Text Document</a>
        <i className="ms-Icon ms-Icon--Page "></i>
      </li>
      <li className="ms-ContextualMenu-item ">
        <a className="ms-ContextualMenu-link " tabIndex="1" >A Coffee</a>
        <i className="ms-Icon ms-Icon--Coffee "></i>
      </li>
      <li className="ms-ContextualMenu-item ">
        <a className="ms-ContextualMenu-link " tabIndex="1" >Picture</a>
        <i className="ms-Icon ms-Icon--Picture "></i>
      </li>
      <li className="ms-ContextualMenu-item ">
        <a className="ms-ContextualMenu-link " tabIndex="1" >Money</a>
        <i className="ms-Icon ms-Icon--Money "></i>
      </li>
</ul>
</div>
      
  </div>
</div>
    
                </PagePanel>
            </div>
        )
    }
}
