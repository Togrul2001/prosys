import React, { useState } from 'react';
import { Button, Drawer, Menu } from 'antd';
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from 'react-router-dom';
import { PiStudentBold, PiBooksBold, PiExam } from "react-icons/pi";
import { FaSignOutAlt } from "react-icons/fa";


const SidebarMenu: React.FC = () => {

    const items = [
        {
            key: "1",
            icon: <PiStudentBold size={20}/>,
            label: <Link to="students">Tələbələr</Link>,
        },
        {
            key: "2",
            icon: <PiBooksBold size={20}/>,
            label: <Link to="lessons">Dərslər</Link>,
        },
        {
            key: "3",
            icon: <PiExam size={20}/>,
            label: <Link to="exams">İmtahanlar</Link>,
        },
    ];
    
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="text" onClick={showDrawer} style={{ padding: "5px", display: "flex", alignItems: "center" }}>
        <RxHamburgerMenu size={35}/>
      </Button>
      <Drawer title="Tədris Menu" onClose={onClose} open={open} placement='left'
        bodyStyle={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}
      >
        <Menu
            defaultSelectedKeys={['1']}
            mode="inline"
            theme="light"
            items={items}
            style={{fontSize:"15px"}}
        />
        <Button
          type="text"
          style={{marginTop: 'auto', display: 'flex', alignItems: 'center', backgroundColor:"red", color:"white" }}
        >
          <FaSignOutAlt style={{ marginRight: 8 }} />
          Çıxış
        </Button>
      </Drawer>
    </>
  );
};

export default SidebarMenu;