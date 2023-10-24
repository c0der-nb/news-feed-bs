let accordionCount = 0;

function createCarouselForNewsItems(items) {
    const newsItemsCarouselEle = document.createElement('div');
    newsItemsCarouselEle.id = `carouselNewsItems${accordionCount}`;
    newsItemsCarouselEle.className = 'carousel slide';
    newsItemsCarouselEle.setAttribute('data-interval', 'false');
    newsItemsCarouselEle.setAttribute('data-ride', 'carousel');
    const carouselInnerDiv = document.createElement('div');
    carouselInnerDiv.className = 'carousel-inner';
    items.forEach((item, idx) => {
        const carouselItemEle = document.createElement('div');
        carouselItemEle.className = `carousel-item ${idx === 0 ? 'active' : ''}`;
        carouselItemEle.innerHTML = `
            <div class="card">
                <a href=${item.link} target="_blank">
                    <img class="card-img-top card-image" src=${item.enclosure.link} alt="Card image cap">
                    <div class="card-body">
                        <h3 class="card-title">${item.title}</h3>
                        <div class="author d-flex align-items-center mt-3">
                            <h6 class="card-subtitle text-muted">${item.author}</h6>
                            <div class="ellipse"></div>
                            <h6 class="card-subtitle text-muted mx-2">${new Date(item.pubDate).toLocaleDateString('en-IN')}</h6>
                        </div>
                        <p class="card-text mt-3">${item.description}</p>
                    </div>
                </a>
            </div>
        `;
        carouselInnerDiv.append(carouselItemEle);
    });
    const anchorEle = document.createElement('a');
    anchorEle.className = 'carousel-next-button';
    anchorEle.setAttribute("href", `#carouselNewsItems${accordionCount}`);
    anchorEle.setAttribute("role", "button");
    anchorEle.setAttribute("data-slide", "next");
    anchorEle.innerHTML = `
        <i class="fa-solid fa-chevron-right" style="color: #737373;"></i>
        <span class="sr-only">Next</span>
    `;
    newsItemsCarouselEle.append(carouselInnerDiv);
    newsItemsCarouselEle.append(anchorEle);
    return newsItemsCarouselEle;
}

async function createAccordionOfItemsAndAddToDOM(magazine) {
    const apiResponse = await fetch('https://api.rss2json.com/v1/api.json?rss_url='+magazine);
    const news = await apiResponse.json();
    accordionCount += 1;
    const accordionContainerDiv = document.getElementById('accordion-id');
    const accordionItemEle = document.createElement('div');
    accordionItemEle.className = 'accordion-item mt-3';
    const buttonEle = document.createElement('button');
    buttonEle.className = 'accordion-button px-0 d-flex align-items-center';
    buttonEle.id = `accordion${accordionCount}`;
    buttonEle.setAttribute("data-toggle", "collapse");
    buttonEle.setAttribute("data-target", `#collapse${accordionCount}`);
    buttonEle.setAttribute("aria-expanded", "true");
    buttonEle.setAttribute("aria-controls", `collapse${accordionCount}`);
    buttonEle.innerHTML = `
        <i class="fa-solid fa-angle-down" id="button-icon-${accordionCount}" style="color: #8c929b;margin-right:5px;"></i>
        ${news.feed.title}
    `;
    accordionItemEle.append(buttonEle);
    const collapseEle = document.createElement('div');
    collapseEle.id = `collapse${accordionCount}`;
    collapseEle.className = `accordion-collapse collapse ${accordionCount === 1 ? 'show' : ''} mt-3`;
    collapseEle.setAttribute("aria-labelled-by", `collapse${accordionCount}`);
    collapseEle.setAttribute('data-parent', '#accordion-id');
    const accordionBodyEle = document.createElement('div');
    accordionBodyEle.className = 'accordion-body';
    let carouselDivEle = createCarouselForNewsItems(news.items);
    accordionBodyEle.append(carouselDivEle);
    collapseEle.append(accordionBodyEle);
    accordionItemEle.append(collapseEle);
    accordionContainerDiv.append(accordionItemEle);
}

(function init() {
    magazines.forEach((magazine) => {
        createAccordionOfItemsAndAddToDOM(magazine);
    })
})();

  