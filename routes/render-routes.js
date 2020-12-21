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
      
      // for each person
			for(let i = 0; i < data.length; i++){
        
        // for each present that person has add it to an arr
				for(let j = 0; j < data[i].dataValues.Presents.length; j++){
          let presCon = {
            giftName: data[i].dataValues.Presents[j].giftName,
            rating: data[i].dataValues.Presents[j].rating
          };

					presArr.push(presCon);
        };
          
        // then sort that array
        for(let i = 0; i < presArr.length -1; i++){

            for(let j = i+1; j < presArr.length; j++){
                if(presArr[i].rating < presArr[j].rating){
                    let tempPresHolder = presArr[j];
                    presArr[j] = presArr[i];
                    presArr[i] = tempPresHolder;
                }; 
            };
        };

        // create 
				let usePres = {
					firstName: data[i].dataValues.firstName,
					lastName: data[i].dataValues.lastName,
					presents: presArr
				};

        hbArr.push(usePres);
        
        presArr = [];
			};
			res.render("users", {user: hbArr});
		});

    });
    
    app.get("/user/search/:fname/:lname", (req, res) => {
        db.User.findAll({
            where: {
                firstName: req.params.fname,
                lastName: req.params.lname
            },
			include: [db.Present]
		}).then((data) => {
			let hbArr = [];
      let presArr = [];
      
      // for each person with the lname and fname
			for(let i = 0; i < data.length; i++){
        
        // create an array of presents
				for(let j = 0; j < data[i].dataValues.Presents.length; j++){
					let presCon = {
						giftName: data[i].dataValues.Presents[j].giftName,
						rating: data[i].dataValues.Presents[j].rating
					};

					presArr.push(presCon);
        };
        
        // then sort the presents
        for(let i = 0; i < presArr.length -1; i++){
          for(let j = i+1; j < presArr.length; j++){
              if(presArr[i].rating < presArr[j].rating){
                  let tempPresHolder = presArr[j];
                  presArr[j] = presArr[i];
                  presArr[i] = tempPresHolder;
              }; 
          };
        };

        // create their hb object
				let usePres = {
					firstName: data[i].dataValues.firstName,
					lastName: data[i].dataValues.lastName,
					presents: presArr
				};

        // store that obj in an arr
        hbArr.push(usePres);
        
        // clear the variables for the next person
        presArr = [];
			};
			console.log(hbArr);
      
      // this part is the part that doesn't work
			res.render("users", {user: hbArr});
		});
    })
};