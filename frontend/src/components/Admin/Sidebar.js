import React from 'react';
import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";

const Sidebar = () => {
  return (
    <div className="sidebar bg-[rgba(255,255,255)] flex flex-col p-[4rem_0]">
    <Link className='text-[rgba(0,0,0,0.493)] font-extralight text-[1rem] p-[2rem] transition-all
    hover:text-[rgba(40,110,80)] scale-(1.1) ' to="/admin/dashboard">
      <p className='flex items-center'>
        <DashboardIcon 
        
        className='mr-[0.5rem]'/> Dashboard
      </p>
    </Link>
    <a
    className='text-[rgba(0,0,0,0.493)] font-extralight text-[1rem] p-[2rem] transition-all
    hover:text-[rgba(40,110,80)] scale-(1.1) '
    >
      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ImportExportIcon />}
      >
        <TreeItem nodeId="1" label="Products">
          <Link 
          className='text-[rgba(0,0,0,0.493)] font-extralight text-[1rem] p-[2rem] transition-all
          hover:text-[rgba(40,110,80)] scale-(1.1) '
          to="/admin/products">
            <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
          </Link>

          <Link 
          className='text-[rgba(0,0,0,0.493)] font-extralight text-[1rem] p-[2rem] transition-all
          hover:text-[rgba(40,110,80)] scale-(1.1) '
          to="/admin/product">
            <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
          </Link>
        </TreeItem>
      </TreeView>
    </a>
    <Link
    className='text-[rgba(0,0,0,0.493)] font-extralight text-[1rem] p-[2rem] transition-all
    hover:text-[rgba(40,110,80)] scale-(1.1) '
    to="/admin/orders">
      <p className='flex items-center'>
        <ListAltIcon />
        Orders
      </p>
    </Link>
    <Link
    className='text-[rgba(0,0,0,0.493)] font-extralight text-[1rem] p-[2rem] transition-all
    hover:text-[rgba(40,110,80)] scale-(1.1) '
    to="/admin/users">
      <p className='flex items-center'>
        <PeopleIcon /> Users
      </p>
    </Link>
    <Link
    className='text-[rgba(0,0,0,0.493)] font-extralight text-[1rem] p-[2rem] transition-all
    hover:text-[rgba(40,110,80)] scale-(1.1) '
    to="/admin/reviews">
      <p className='flex items-center'>
        <RateReviewIcon />
        Reviews
      </p>
    </Link>
  </div>
  )
}

export default Sidebar