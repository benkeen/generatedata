import React from 'react';
const customFooterLinks = [];
// to keep things simple, a registered footer link should be wrapped in it's own <li>. That way it can
// supply any additional styling for the whole link externally.
export const registerCustomFooterLink = (link) => {
    customFooterLinks.push(link);
};
export const getCustomFooterLinks = () => (customFooterLinks.map((Link, index) => <Link key={index}/>));
//# sourceMappingURL=extensionUtils.js.map