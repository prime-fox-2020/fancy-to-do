const check = (title, description, status, due_date) => {
    let errorMsg = [];
    if(title === ''){
        errorMsg.push('Title is empty!');
    }
    if(description === ''){
        errorMsg.push('Description is empty!');
    }
    if(status === ''){
        errorMsg.push('Status is empty!');
    }
    if(due_date === ''){
        errorMsg.push('Date is empty!');
    }
    return errorMsg;
}

module.exports = { check }