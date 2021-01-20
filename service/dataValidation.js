

exports.reqValidate = data => {
    if(!data.email || data.email.trim() === ""){
        throw new Error();
    }
    if(!data.name || data.name.trim() === ""){
        throw new Error();
    }
    if(!data.contact || data.contact.trim() === ""){
        throw new Error();
    }
    if(!data.lost_at || !data.lost_at instanceof Date ){
        throw new Error();
    }
}
