const isAuthenticated = require("../config/middleware/isAuthenticated")
const db = require("../models");

module.exports = (app) => {

    app.get("/", (req, res) => {
		res.render("index")
	});

    app.get("/login", (req, res) => {
		res.render("login")
    });
    
    app.get("/signup", (req, res) => {
		res.render("signup")
	});

    app.get("/createList", isAuthenticated, (req, res) => {
        console.log("is reloading")
        db.Present.findAll({
          where: {
            UserId: req.user.id
          }
        }).then((data) => {
          let Present = [];
          
          for (let i = 0; i < data.length; i++) {
            presObj = {
              giftName: data[i].dataValues.giftName,
              rating: data[i].dataValues.rating,
              id: data[i].dataValues.id
            };
    
            Present.push(presObj);
          };
    
          for(let i = 0; i < Present.length -1; i++){
    
            for(let j = i+1; j < Present.length; j++){
              if(Present[i].rating < Present[j].rating){
                let tempPresHolder = Present[j];
                Present[j] = Present[i];
                Present[i] = tempPresHolder;
              }; 
            };
          };
    
          res.render("createList", { Present: Present });
        });
    });

    app.get("/users", (req, res) => {
		db.User.findAll({
			include: [db.Present]
		}).then((data) => {
			let hbArr = [];
			let presArr = [];
			for(let i = 0; i < data.length; i++){
				
				for(let j = 0; j < data[i].dataValues.Presents.length; j++){
					let presCon = {
						giftName: data[i].dataValues.Presents[j].giftName,
						rating: data[i].dataValues.Presents[j].rating
					};

					presArr.push(presCon);
                };
                
                for(let i = 0; i < presArr.length -1; i++){
    
                    for(let j = i+1; j < presArr.length; j++){
                        if(presArr[i].rating < presArr[j].rating){
                            let tempPresHolder = presArr[j];
                            presArr[j] = presArr[i];
                            presArr[i] = tempPresHolder;
                        }; 
                    };
                };

				let usePres = {
					firstName: data[i].dataValues.firstName,
					lastName: data[i].dataValues.lastName,
					presents: presArr
				};

				hbArr.push(usePres);
			};
			console.log(hbArr)
			console.log(hbArr[0].presents)
			console.log(hbArr[0].presents[0])
			res.render("users", {user: hbArr});
		});

	});
};