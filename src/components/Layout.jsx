import React from 'react';

const Layout = ({ children }) => {
    return (
        <div className="flex h-screen overflow-hidden bg-gray-100 font-sans">
            {children}
        </div>
    );
};

export default Layout;
