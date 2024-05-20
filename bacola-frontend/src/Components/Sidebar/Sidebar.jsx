import React from 'react'
import '../../Components/Sidebar/listing.css';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';


const sidebar = () => {
  return (
    <>
      <section className='sidebar'>
        <div className="container">
          <div className=" widget  filterbox">
            <h6 className='widget-title'>PRODUCT CATEGORIES</h6>
            <div className="scroll">
              <ul>
                <li><FormControlLabel className='w-100' control={<Checkbox />} label="Beverages" /> </li>
                <li><FormControlLabel className='w-100' control={<Checkbox />} label="Biscuits & Snacks" /></li>
                <li><FormControlLabel className='w-100' control={<Checkbox />} label="Breads & Bakery" /></li>
                <li><FormControlLabel className='w-100' control={<Checkbox />} label="Breakfast & Dairy" /></li>
                <li><FormControlLabel className='w-100' control={<Checkbox />} label="Fruits & Vegetables" /></li>
                <li><FormControlLabel className='w-100' control={<Checkbox />} label="Grocery & Staples" /></li>
                <li><FormControlLabel className='w-100' control={<Checkbox />} label="Household Needs" /></li>
                <li><FormControlLabel className='w-100' control={<Checkbox />} label="Meats & Seafood" /></li>
              </ul>
            </div>
          </div>


          <div className="widget woocommerce widget_price_filter mt-5">
            <h4 className="widget-title">Filter by price</h4>
            <form method="get">
              <div className="price_slider_wrapper">
                <div className="price_slider ui-slider  ui-widget ui-widget-content">
                  <div className="ui-slider-range ui-widget-header" style={{ left: '0%', width: '100%' }}></div>
                  <span className="ui-slider-handle ui-state-default" style={{ left: '0%' }}></span>
                  <span className="ui-slider-handle ui-state-default" style={{ left: '100%' }}></span>
                </div>
                <div className="price_slider_amount" data-step="10">
                  <label className="screen-reader-text" >Min price</label>
                  <input type="text" id="min_price" name="min_price" value="0" data-min="0" style={{ display: 'none' }} />
                  <label className="screen-reader-text" >Max price</label>
                  <input type="text" id="max_price" name="max_price" value="20" data-max="20" style={{ display: 'none' }} />
                  <button type="submit" className="button">Filter</button>
                  <div className="price_label">
                    Price: <span className="from">$0</span> — <span className="to">$20</span>
                  </div>
                  <input type="hidden" name="_pjax" />
                  <input type="hidden" name="filter_cat" />
                </div>
              </div>
            </form>
          </div>

          <div className=" widget  product_staus mt-5">
            <h4 className='widget-title'>PRODUCT STATUS</h4>
            <div className="scroll">
              <ul>
                <li><FormControlLabel className='w-100' control={<Checkbox />} label="In Stock" /> </li>
                <li><FormControlLabel className='w-100' control={<Checkbox />} label="On Sale" /> </li>
              </ul>
            </div>
          </div>

          <div className=" widget  product_staus mt-5">
            <h4 className='widget-title'>BRANDS</h4>
            <div className="scroll">
              <ul>

                <li style={{ display: "flex", justifyContent: "space-between" }} className='mb-2'><FormControlLabel className='w-100' control={<Checkbox />} label="Frito Lay" /> <span class="count d-flex">(10)</span></li>
                <li style={{ display: "flex", justifyContent: "space-between" }} className='mb-2'><FormControlLabel className='w-100' control={<Checkbox />} label="Nespresso" /> <span class="count">(10)</span></li>
                <li style={{ display: "flex", justifyContent: "space-between" }} className='mb-2'><FormControlLabel className='w-100' control={<Checkbox />} label="Oreo" /> <span class="count">(10)</span></li>
                <li style={{ display: "flex", justifyContent: "space-between" }} className='mb-2'><FormControlLabel className='w-100' control={<Checkbox />} label="Quaker" /><span class="count">(10)</span> </li>
                <li style={{ display: "flex", justifyContent: "space-between" }} className='mb-2'><FormControlLabel className='w-100' control={<Checkbox />} label="Welch's" /> <span class="count">(10)</span></li>
              </ul>
            </div>
          </div>

          <div className="widget widget_media_image mt-5 mb-20">
            <img src="https://klbtheme.com/bacola/wp-content/uploads/2021/05/sidebar-banner.gif" alt="" />
          </div>
        </div>
      </section>
    </>
  )
}

export default sidebar
