(function(){
    let articlesData = createSrcset(DATA);
    init(articlesData);

    function init(data){
        let rootElement = document.querySelectorAll(".main")[0] || null;
        let articleTemplates = {
            "l": document.querySelector("#article-template-l") || null,
            "m": document.querySelector("#article-template-m") || null,
            "no-descroption": document.querySelector("#article-template-no-description") || null,
            "no-image": document.querySelector("#article-template-no-image") || null
        }

        if(!rootElement || !data){
            error();
            return;
        }

        let articlesConteiner = document.createElement("div");
        articlesConteiner.classList.add("mainGrid");
        articlesConteiner =  createContent(articlesConteiner, articleTemplates, data);
        rootElement.appendChild(articlesConteiner);
    }

    function createContent(container, articleTemplates, data){
        if (!container || !data){
            return null;
        }

        const MAIN_SELECTOR = ".article";
        const PICTURE_SELECTOR = ".picture";
        const TITLE_SELECTOR = ".article__title";
        const DESCRIPTION_SELECTOR = ".article__description";
        const CHANNEL_NAME_SELECTOR = ".article__channel-name";
        data && data.length && data.forEach((item, index) => {
            let cloneTemplate;
            if(!item.description){
                cloneTemplate = document.importNode(articleTemplates["no-descroption"], true);
            } else if(!item.image){
                cloneTemplate = document.importNode(articleTemplates["no-image"], true);
            } else if(item.size.toLowerCase() !== "s"){
                cloneTemplate = document.importNode(articleTemplates[item.size.toLowerCase()], true);
            }
            let mainElem = cloneTemplate.content.querySelectorAll(MAIN_SELECTOR)[0];
            if(item.size){
                mainElem.classList.add("size-" + item.size);
            }
            if(item.title){
                let titleElem = cloneTemplate.content.querySelectorAll(TITLE_SELECTOR)[0];
                titleElem.textContent = item.title;
                titleElem.style.color = item.titleColor || "#000";
            }
            if(item.image){
                let pictureElem = cloneTemplate.content.querySelectorAll(PICTURE_SELECTOR)[0];
                let max = pictureElem.querySelector('.max');
                let min = pictureElem.querySelector('.min');
                let image = pictureElem.querySelector('.image');
                max.setAttribute("srcset", item.imageSrcset[1] || item.image);
                min.setAttribute("srcset", item.imageSrcset[0] || item.image);
                image.setAttribute("src", item.image);
            }
            if(item.description){
                let descriptionElem = cloneTemplate.content.querySelectorAll(DESCRIPTION_SELECTOR)[0];
                descriptionElem.textContent = item.description;
            }
            if(item.channelName){
                let channelNameElem = cloneTemplate.content.querySelectorAll(CHANNEL_NAME_SELECTOR)[0];
                channelNameElem.textContent = item.channelName;
            }
            container.appendChild(cloneTemplate.content);
        });
        return container;
    }

    function createSrcset(data){
        let imageTwoName = "@2x.";
        let imageThreeName = "@3x.";
    
        data && data.length && data.forEach(item => {
            if(!!item.image){
                let partsName = item.image.split(".");
                let srcSet = [  partsName[0] + imageTwoName + partsName[1] , 
                                partsName[0] + imageThreeName + partsName[1]
                            ];
                item.imageSrcset = srcSet;
            }  
        });
        return data;
    }

    function error(){
        alert("Некорректный шаблон");
    }

})();

    