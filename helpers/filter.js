exports.lostPetsFilter = (req, res, dbResponse) => {
    
    if(dbResponse.length === 0) return res.status(200).json({msg: 'There are no lost pets yet'});
    
    // Filter the response to show only lost pets
    
    dbResponse = dbResponse.filter(i => i.isLost);
    
    if(dbResponse.length === 0) return res.status(200).json({msg: 'There are no lost pets yet'});
    
    let userResponse = dbResponse.map(lostPet => {
    
        let newLostPet = {};
    
        newLostPet.code = lostPet.code;
    
        newLostPet.photo_url = lostPet.photo_url;
    
        newLostPet.lost_at = lostPet.lost_at;
    
        return newLostPet;
    
    });

    return userResponse;
}

exports.lostPetsWLimitFilter = (req, res, dbResponse) => {

    if(dbResponse.length === 0) return res.status(200).json({msg: 'There are no lost pets yet'});
        
    // Filter the response to show only lost pets
    
    let i = 0;
    
    dbResponse = dbResponse.map( user => {
    
        if(i < req.params.limit && user.isLost){
    
            i++;
    
            return user;
    
        }
    
        return;

    });
    
    dbResponse = dbResponse.filter(user => user);
    
    if(dbResponse.length === 0) return res.status(200).json({msg: 'There are no lost pets yet'});

    let userResponse = dbResponse.map(lostPet => {
    
        let newLostPet = {};
    
        newLostPet.code = lostPet.code;
    
        newLostPet.photo_url = lostPet.photo_url;
    
        newLostPet.lost_at = lostPet.lost_at;
    
        return newLostPet;
    
    });

    return userResponse;
}