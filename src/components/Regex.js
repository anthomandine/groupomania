
// eslint-disable-next-line
export const validEmail = new RegExp('^[a-zA-Z0-9\._-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$');

//export const validPassword = new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$');
export const validPassword = new RegExp('[A-Za-z1-9]');

export const validPseudo = new RegExp('^[A-Za-z1-9_-]+$');

export const validPost = new RegExp('^[-A-Za-z1-9_" ,()é!àç:.?\']+$');

export const validComment = new RegExp('^[-A-Za-z1-9_" ,()é!àç:.?\']+$');


