const realEstateRepo = require('real_estate/repositories/real_estate.repository');

class RealEstateController {
	constructor() { }

    async realEstateContent(req, res) {
		try {
            if(_.isObject(req.body) && _.has(req.body, 'type')){
                switch(req.body.type) {
                    case 'sale':
                      if(_.has(req.body, 'cityId') && req.body.cityId !== ''){
                        let saleContentData = await realEstateRepo.getsaleContent({'cityId':req.body.cityId, 'isDeleted': false, 'status':'Active'});
                        if(!_.isEmpty(saleContentData)){
                            return { status: 200, data: saleContentData, message: 'Records fetched successfully.' }
                        }else{
                            return { status: 201, data: [], message: 'Records not found.' }
                        }
                      }else{
                        let saleContentDefault = await realEstateRepo.getsaleContent({'cityId':null, 'isDeleted': false, 'status':'Active'});
                        if(!_.isEmpty(saleContentDefault)){
                            return { status: 200, data: saleContentDefault, message: 'Records fetched successfully.' }
                        }else{
                            return { status: 201, data: [], message: 'Records not found.' }
                        }
                      }
                      break;
                    case 'rent':
                        if(_.has(req.body, 'cityId') && req.body.cityId !== ''){
                            let rentContentData = await realEstateRepo.getrentContent({'cityId':req.body.cityId, 'isDeleted': false, 'status':'Active'});
                            if(!_.isEmpty(rentContentData)){
                                return { status: 200, data: rentContentData, message: 'Records fetched successfully.' }
                            }else{
                                return { status: 201, data: [], message: 'Records not found.' }
                            }
                          }else{
                            let rentContentDefault = await realEstateRepo.getrentContent({'cityId':null, 'isDeleted': false, 'status':'Active'});
                            if(!_.isEmpty(rentContentDefault)){
                                return { status: 200, data: rentContentDefault, message: 'Records fetched successfully.' }
                            }else{
                                return { status: 201, data: [], message: 'Records not found.' }
                            }
                          }
                      break;
                    case 'buy':
                        if(_.has(req.body, 'cityId') && req.body.cityId !== ''){
                            let buyContentData = await realEstateRepo.getbuyContent({'cityId':req.body.cityId, 'isDeleted': false, 'status':'Active'});
                            if(!_.isEmpty(buyContentData)){
                                return { status: 200, data: buyContentData, message: 'Records fetched successfully.' }
                            }else{
                                return { status: 201, data: [], message: 'Records not found.' }
                            }
                          }else{
                            let buyContentDefault = await realEstateRepo.getbuyContent({'cityId':null, 'isDeleted': false, 'status':'Active'});
                            if(!_.isEmpty(buyContentDefault)){
                                return { status: 200, data: buyContentDefault, message: 'Records fetched successfully.' }
                            }else{
                                return { status: 201, data: [], message: 'Records not found.' }
                            }
                          }
                      break;
                  }
                  
            }
		}
		catch (error) {
			return res.status(500).send({ message: error.message });
		}
	}
}

module.exports = new RealEstateController();