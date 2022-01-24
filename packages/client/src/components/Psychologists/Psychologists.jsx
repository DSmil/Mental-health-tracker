import React, { useEffect,useState,useCallback } from 'react';
import 'devextreme/dist/css/dx.light.css';
import './profile.css';
import { data } from './data.js';
import { Scheduler, View, Editing } from 'devextreme-react/scheduler';
import {
    DataGrid,
    Column,
    ColumnFixing,
    ColumnChooser, 
    FilterRow,
    SearchPanel,
    Selection,
    MasterDetail
    
} from 'devextreme-react/data-grid';
import { employees } from './employees.js';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import notify from 'devextreme/ui/notify';

import { Availability, reserved1 } from './scheduler/data';
import {isValidAppointment, isValidAppointmentDate,  } from './scheduler/utils';
import DataCell from './scheduler/DataCell';

function DetailSection(props) {
    const employee = props.data.data;
    console.log(employee)
    const [reserved, setReserved] = useState([]);
 
    const [available, setAvailable] = React.useState([]);
     
     let data = {};
     var localget1 = '/auth/scheduler';
     var serverget1 = 'http://jstest.senlab.io/davor-backend/render-appointments';
   
     var localget2 = 'http://localhost:3005/render-availability';
     var serverget2 = 'http://jstest.senlab.io/davor-backend/render-availability';
   
     var localget3 = '/auth/add-reservation';
     var serverget3 = 'http://jstest.senlab.io/davor-backend/add-availability';
   
     useEffect(() => {
     
   
             
         axios
         .get(localget1)
         .then(res => {
          
           setReserved(res.data)
           
           
         })
         .catch(err => {
           console.log(err);
         })
   
         
   
     }, []);
    
     reserved1.push(reserved)
     Availability.push(available);
   
     const converReserved = reserved.map((convert) => {
       return { text: convert.text,
                startDate :new Date(convert.StartDate),
                endDate: new Date(convert.EndDate)}
     })
   
   
   
     const onAppointmentFormOpening = e => {
       
   
       const startDate = new Date(e.appointmentData.startDate);
   
       if (!isValidAppointmentDate(startDate)) {
         e.cancel = true;
         notifyDisableDate();
       }
     }
   
     const onAppointmentAdding = e => {
       const isValidAppointment1 = isValidAppointment(e.component, e.appointmentData);
     
       if (!isValidAppointment1) {
         e.cancel = true;
         notifyDisableDate();
       }
       if(!isValidAppointment1){
         data = {
            id: employee.EmployessID,
           text: e.appointmentData.text,
           StartDate: e.appointmentData.startDate.toLocaleDateString('en-US') + " " + e.appointmentData.startDate.toLocaleTimeString('en-US'),
           EndDate: e.appointmentData.endDate.toLocaleDateString('en-US') + " " + e.appointmentData.endDate.toLocaleTimeString('en-US')
         };
         console.log("i am here")
         var request = new Request(localget3 , {
            method:'POST',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify(data)
      
          });
          fetch(request)
            .then(function(response){
              response.json()
              .then(function(data){
                console.log(data)
              })
            })
            .catch(function(err){
              console.log(err)
            })
     }
   
     }
   
   
     const  onAppointmentUpdating = e =>{
       const isValidAppointment1 = isValidAppointment(e.component, e.newData);
       if (isValidAppointment1) {
         e.cancel = true;
         notifyDisableDate();
       }
     }
   
     const onappointmentClick = e => {
       e.cancel=true;
     }
   
     const notifyDisableDate = () => {
       notify('Cannot create or move an appointment/event to disabled time/date regions.', 'warning', 1000);
     }
   
     const renderDataCell = itemData => {
       return <DataCell itemData={itemData} />;
     }
   
     
   
     const currentDate = new Date(2022, 0, 24);
     const views = ['workWeek', 'month'];
     const currentView = views[0];

    return (
        <div>
            <img
                className="employee-photo"
                alt={employee.FullName}
                src={employee.Photo}
            />
            <p className="employee-notes">{employee.Notes}</p>
            <Scheduler 
            id="scheduler1"  
            textExpr="title"
            allDayExpr="dayLong"
            recurrenceRuleExpr="recurrence"
            currentView="month"
            currentDate={currentDate}
            dataSource={converReserved}
            views={views}
            defaultCurrentView={currentView}
            defaultCurrentDate={currentDate}
            showAllDayPanel={false}
            startDayHour={9}
            endDayHour={19}
            
            dataCellRender={renderDataCell}
            
            onAppointmentClick ={onappointmentClick}
            adaptivityEnabled={true}
            onAppointmentFormOpening={onAppointmentFormOpening}
            onAppointmentAdding={onAppointmentAdding}
            onAppointmentUpdating={onAppointmentUpdating}>
                {/* Configuration goes here */}
                
                <View type="month"
                startDayHour={10}
                endDayHour={22} />

                <Editing 
                allowDragging={false}
                allowTimeZoneEditing={true}
                />
                adaptivityEnabled={true}
            </Scheduler>
        </div>
    );
}

const Psychologists = () => {
    const [dataGrid, setdataGrid] = useState();
    const [selectedEmployee, setSelectedEmployee] = useState();
    const selectEmployee = (e) => {
        e.component.byKey(e.currentSelectedRowKeys[0]).done(employee => {
            setSelectedEmployee(employee);
            
        });
        e.component.collapseAll(-1);
        e.component.expandRow(e.currentSelectedRowKeys[0]);
    }

    var localget_address = 'http://localhost:4000/auth/psyhologist'

    useEffect(() => {
       
        axios
        .get(localget_address)
        .then(res => {
            console.log(res.data)
            setdataGrid(res.data)
        })
        .catch(err => {
            console.log(err);
          })
    }, []);






    const contentReady = (e) =>{
        if (!e.component.getSelectedRowKeys().length)
        { e.component.selectRowsByIndexes(0); }
      }

    return <div className="App">
        <Navbar />
    <DataGrid
        dataSource={dataGrid}
        keyExpr="EmployeeID"
        allowColumnReordering={true}
        columnAutoWidth={true}
        onSelectionChanged={selectEmployee}
        onContentReady={contentReady}
        showBorders={true}
        id="grid-container"
        >


        <Column dataField="FullName" fixed={true}  sortOrder="asc"></Column>
        <Column dataField="Position"></Column>
        <Column
            dataField="BirthDate"
            dataType="date"
            width={100}>
        </Column>
        <Column
            dataField="HireDate"
            dataType="date"
            width={100}>
        </Column>
        <Column dataField="City" />
        <Column dataField="Country"  sortOrder="asc" ></Column>
        <Column dataField="Address" />
        <Column dataField="HomePhone" />
        <Column dataField="PostalCode" visible={false} />
        <ColumnFixing enabled={true} />
        <ColumnChooser enabled={true} />
        <FilterRow visible={true} />
        <SearchPanel visible={true} width="90%" id="SearchBar1"/>
        <Selection mode="single"  />
        <MasterDetail
            enabled={true}
            component={DetailSection}
        />
   



    </DataGrid>
  
</div>
};

export default Psychologists;