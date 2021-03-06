OBB.templates = {

    nodeCard: function( data, card_id, peer_id ){
        var to_print = '';

        to_print += '<div class="NodeCard"';
        // add the card_id if it was passed as a parameter
        if (card_id) {
            to_print += ' id="' + card_id + '"';
        }
        if (peer_id) {
            to_print += ' peer_id="' + peer_id + '"';
        }
        to_print += '>\n';
        to_print += '   <div class="NodeCard__header" style="background-image: url(' + data.header_img_tiny + ');">\n';
        to_print += '       <!-- Store Avatar -->\n';
        to_print += '       <div class="Avatar" style="background-image: url(' + data.avatar + ')"></div>\n';
        to_print += '   </div>\n';
        to_print += '   <div class="NodeCard__body">\n';
        to_print += '       <span class="NodeCard__name">' + data.name + '</span>\n';
        if (data.handle) {
            to_print += '       <span class="NodeCard__handle">' + data.handle + '</span>\n';
        }
        to_print += '       <p>\n';
        to_print += '           ' + data.description + '\n';
        to_print += '       </p>\n';
        to_print += '       <div class="NodeCard__bottom">\n';
        to_print += '           <div class="NodeCard__location">\n';
        to_print += '               <i class="fa fa-map-marker icon--map-pin" aria-hidden="true"></i>\n';
        to_print += '               ' + data.location + '\n';
        to_print += '           </div>\n';
        to_print += '           <div class="NodeCard__ratings">\n';
        to_print += '               <i class="fa fa-star icon--star--small" aria-hidden="true"></i>\n';
        to_print += '               ' + data.ave_rating + '\n';
        to_print += '               (<a>' + data.rating_count + '</a>)\n';
        to_print += '           </div>\n';
        to_print += '       </div>\n';
        to_print += '   </div>\n';
        to_print += '   <div class="NodeCard__search__status status">Searching...</div>\n';
        to_print += '</div>\n';

        return to_print;
    },

    listingCard: function( data ) {
        var to_print = '';

        to_print += '<div class="ListingCard';

        if (data.nsfw) {
            to_print += ' nsfw';
        }

        to_print += '"> \n';
        to_print += '   <div class="ListingCard__header"> \n';
        to_print += '       <div class="ListingCard__header__bg" style="background-image: url(' + data.img_url + ')"> \n';
        to_print += '       </div> \n';
        to_print += '       <div class="ListingCard__header__nsfw"> \n';
        to_print += '           <div>\n';
        to_print += '               <img src="./dist/images/icon--nsfw.png">\n';
        to_print += '               <button class="button">Show Mature Content</button>\n';
        to_print += '           </div>\n';
        to_print += '       </div> \n';
        to_print += '       <ul class="ListingCard__header__tags"> \n';
        if (data.free_shipping.length > 0) {
            to_print += '           <li> \n';
            to_print += '               <span class="tag tag--green">Free Shipping</span> \n';
            to_print += '           </li> \n';
        }
        to_print += '       </ul> \n';
        to_print += '   </div> \n';
        to_print += '   <div class="ListingCard__body"> \n';
        to_print += '       <span class="ListingCard__title">' + data.title + '</span> \n';
        to_print += '       <div class="ListingCard__bottom"> \n';
        to_print += '           <div class="ListingCard__ratings"> \n';
        to_print += '               <i class="fa fa-star icon--star--small" aria-hidden="true"></i> \n';
        to_print += '               <span class="ListingCard__ratings__value">' + data.ave_rating + '</span> \n';
        to_print += '               (<span class="ListingCard__ratings__count">' + data.rating_count + '</span>) \n';
        to_print += '           </div> \n';
        to_print += '           <div class="ListingCard__price"> \n';
        to_print += '               <span class="strong ListingCard__price__value">$' + data.price + '</span> \n';
        to_print += '           </div> \n';
        to_print += '       </div> \n';
        to_print += '   </div> \n';
        to_print += '</div> \n';

        return to_print;
    },

    listingCardContainer: function ( listing_cards, id ) {
        var to_print = '',
            temp = '';

        to_print += '<ul class="CardContainer" id="' + id + '">\n';

        $.each(listing_cards, function(index, listing) {
            if (listing.title == 'social' || listing.title == '#social') {
                return; // TODO remove this if statement, it's only here to prevent social listings from showing temporarily.
            };
            to_print += '    <li class="Card';
            // add filter classes

            // category filter
            $.each(listing.categories_array, function(index, category) {
                temp = category;
                temp = temp.replace(/[^a-zA-Z]/g, "").toLowerCase();
                to_print += ' filter--categories--' + temp;
            });
            // shipping filter
            $.each(listing.ships_to, function(index, option) {
                temp = option;
                temp = temp.replace(/[^a-zA-Z]/g, "").toLowerCase();
                to_print += ' filter--ships-to--' + temp;
            });
            // free-shipping filter
            if (listing.free_shipping.length > 0) {
                to_print += ' filter--free-shipping';
            }
            to_print += '" listing-slug="' + listing.slug + '">\n';

            to_print += OBB.templates.listingCard( listing ) + '\n';
            to_print += '    </li>\n';
        });
        to_print += '</ul>\n';

        return to_print;
    },

    filterCardCategoryOptions: function ( categories_array ) {
        var to_print = '',
            temp = '';

        to_print += '    <ul class="button-group radio-filters" data-filter-group="category" id="FilterCard--category__list">\n';
        to_print += '        <li><input class="filter-group--categories__category" type="radio" data-filter="" name="filter--listings--categories" checked>Any</li>\n';

        $.each(categories_array, function(index, category) {
            temp = category;
            temp = temp.replace(/[^a-zA-Z]/g, "").toLowerCase();
            to_print += '        <li><input class="filter-group--categories__category" type="radio" data-filter=".filter--categories--' + temp + '" name="filter--listings--categories">' + category + '</li>\n';
        });

        to_print += '    </ul>\n';

        return to_print;
    },

    filterCardShippingOptions: function ( countries_array ) {
        var to_print = '',
            temp = '';

        to_print += '            <select class="select-filters" name="filter--listings--ships-to" id="filter--listings--ships-to">\n';
        to_print += '               <option value="">Show All</option>\n';

        $.each(countries_array, function(index, country) {
            temp = country;
            temp = temp.replace(/[^a-zA-Z]/g, "").toLowerCase();
            if (temp == 'all') {
                to_print += '           <option value=".filter--ships-to--' + temp + '">Worldwide</option>\n';
            } else {
                to_print += '           <option value=".filter--ships-to--' + temp + '">' + OBB.functions.titleCase(country) + '</option>\n';
            }
        });
        to_print += '            </select>\n';

        return to_print;
    },

    nodeInfo: function ( node_summary ) {
        to_print = '';

        to_print += '<div class="NodeInfo">\n';
        to_print += '    <div class="Avatar" style="background-image: url(' + node_summary.avatar + ')"></div>\n';
        to_print += '    <div class="NodeSummary">\n';
        to_print += '        <h3>'+ node_summary.name +'</h3>\n';
        to_print += '        <div>\n';
        to_print += '            <div class="NodeLocation">\n';
        to_print += '                <i class="fa fa-map-marker icon--map-pin" aria-hidden="true"></i>\n';
        to_print += '                ' + node_summary.location + '\n';
        to_print += '            </div>\n';
        to_print += '            <div class="NodeRatings">\n';
        to_print += '                <i class="fa fa-star icon--star--small" aria-hidden="true"></i>\n';
        to_print += '                ' + node_summary.ave_rating + '\n';
        to_print += '                (<a>' + node_summary.rating_count + '</a>)\n';
        to_print += '            </div>\n';
        to_print += '        </div>\n';
        to_print += '    </div>\n';
        to_print += '</div>\n';

        return to_print;
    },

    overlayListingReturnToStore: function ( node_summary ) {
        to_print = '';

        to_print += '    <div class="ListingOverlay__nav__left click-to-close flex" id="ListingOverlay__nav__return-to-store">\n';
        to_print += '        <div class="Avatar" style="background-image: url(' + node_summary.avatar + ')"></div>\n';
        to_print += '        <span class="ListingOverlay__store-name">'+ node_summary.name +'</span>\n';
        to_print += '        <span class="ListingOverlay__return">Return to Store</span>\n';
        to_print += '    </div>\n';

        return to_print;
    },

    overlayPurchaseBottom: function ( ob_url ) {
        to_print = '';

        to_print += '<div class="PurchaseOverlay__body__bottom" id="PurchaseOverlay__body__bottom">\n';
        to_print += '    <p>\n';
        to_print += '        Already have the OpenBazaar app?\n';
        to_print += '    </p>\n';
        to_print += '    <div>\n';
        to_print += '        <a href="' + ob_url + '" class="button--shadowed strong">\n';
        to_print += '            Open this listing in OpenBazaar\n';
        to_print += '        </a> \n';
        to_print += '        <p>\n';
        to_print += '            View this listing in OpenBazaar\n';
        to_print += '        </p>\n';
        to_print += '    </div>\n';
        to_print += '<div>\n';
        to_print += '    <div class="button--shadowed strong" id="click-to-copy" data-clipboard-target="#listing-url">\n';
        to_print += '        Copy URL\n';
        to_print += '        <div id="copied-indicator">\n';
        to_print += '            Copied!\n';
        to_print += '        </div>\n';
        to_print += '    </div>\n';
        to_print += '    <p>\n';
        to_print += '        Listing URL: <span id="listing-url">' + ob_url + '</span>\n';
        to_print += '    </p>\n';
        to_print += '</div>\n';
        to_print += '</div>\n';

        return to_print;
    },

    pageNodeNavSummary: function( node_summary ) {
        to_print = '';

        to_print += '<div class="NodeInfo" id="NodeNavSummary">\n';
        to_print += '    <div class="Avatar" style="background-image: url(' + node_summary.avatar + ')"></div>\n';
        to_print += '    <div class="NodeSummary">\n';
        to_print += '        <h3>' + node_summary.name + '</h3>\n';
        to_print += '        <div>\n';
        to_print += '            <div class="NodeLocation">\n';
        to_print += '                <i class="fa fa-map-marker icon--map-pin" aria-hidden="true"></i>\n';
        to_print += '                ' + node_summary.location + '\n';
        to_print += '            </div>\n';
        to_print += '            <div class="NodeRatings">\n';
        to_print += '                <i class="fa fa-star icon--star--small" aria-hidden="true"></i>\n';
        to_print += '                ' + node_summary.ave_rating + '\n';
        to_print += '                (<a>' + node_summary.rating_count + '</a>)\n';
        to_print += '            </div>\n';
        to_print += '        </div>\n';
        to_print += '    </div>\n';
        to_print += '</div>\n';

        return to_print;
    },

    pageNodeNavTabs: function( listings, following, followers ) {
        to_print = '';
        to_print += '<ul id="NodeNavTabs">\n';
        to_print += '    <li class="navtab" name="tab--home">\n';
        to_print += '        <div>Home</div>\n';
        to_print += '    </li>\n';
        to_print += '    <li class="navtab active" name="tab--store">\n';
        to_print += '        <div>Store <span class="green">' + listings.length + '</span></div>\n';
        to_print += '    </li>\n';
        to_print += '    <li class="navtab" name="tab--following" id="tab--following">\n';
        to_print += '        <div>Following <span class="green">' + following.length + '</span></div>\n';
        to_print += '    </li>\n';
        to_print += '    <li class="navtab" name="tab--followers" id="tab--followers">\n';
        to_print += '        <div>Followers <span class="green">' + followers.length + '</span></div>\n';
        to_print += '    </li>\n';
        to_print += '</ul>\n';

        return to_print;
    },

    tabNodeHeader: function( node_summary, title, slug ) {
        to_print = '';

        to_print += '<div class="Node__header" style="background-image: url(' + node_summary.header_img_large + ');" id="Tab--' + slug + '__header">\n';
        to_print += '    <h1>' + title + '</h1>\n';
        to_print += '</div>\n';

        return to_print;
    },

    tabHomeInformation: function( info_obj, peer_id){
        to_print = '';

        // loop through OBB.model.current_store.contact_info and replace this info.
        // NOTE: I'm not sure if the keys of info_object are user-defined or not. But if they are standardized
        //  then we do much better than this (creating working links for each of these, for example). Until I
        //  know whether they are standardized though, I'll leave it like this.
        
        to_print += '<ul id="Tab--home__information">\n';
        to_print += '    <li>\n';
        to_print += '        <h5>OpenBazaar ID</h5>\n';
        to_print += '        <p title="' + peer_id + '">' + peer_id + '</p>\n';
        to_print += '    </li>\n';

        $.each(info_obj, function(key, value) {
            to_print += '    <li>\n';
            if ( value ) {
                to_print += '        <h5>' + key + '</h5>\n';
                to_print += '        <p>' + value + '</p>\n';
            };
            to_print += '    </li>\n';
        });

        to_print += '</ul>\n';

        return to_print;
    },

    overlayListingOverview: function( listing ){
        to_print = '';
        to_print += '<section class="section ListingOverview" id="overlayListingOverview">\n';
        to_print += '    <div class="flex ListingOverview__top">\n';
        to_print += '        <div class="ListingOverview__top__left">\n';
        to_print += '            ' + listing.title + '\n';
        to_print += '        </div>\n';
        to_print += '        <div class="ListingOverview__top__right">\n';
        to_print += '            $' + listing.price + '\n';
        to_print += '        </div>\n';
        to_print += '    </div>\n';
        to_print += '    <div class="flex ListingOverview__body">\n';
        to_print += '        <div class="Column--left">\n';
        to_print += '            <div class="ListingOverview__img" style="background-image: url(' + listing.images[0] + ')"></div>\n';
        to_print += '            <div class="click-to-slideshow">View ' + listing.num_of_photos + ' photos</div>\n';
        to_print += '        </div>\n';
        to_print += '        <div class="Column--right">\n';
        to_print += '            <div class="ListingOverview__buy-now">\n';

        if ( listing.options.length > 0 ) {
            to_print += '                <ul class="ListingOverview__buy-now__options">\n';

            $.each(listing.options, function(index, option) {
               
                to_print += '                    <li class="flex">\n';
                to_print += '                        <span>' + option.name + '</span>\n';
                to_print += '                        <select>\n';
                to_print += '                            <option>' + option.description + '</option>\n';
                    $.each(option.variants, function(index, variant) {
                        to_print += '                            <option>' + variant.name + '</option>\n';
                    });

                to_print += '                        </select>\n';
                to_print += '                    </li>\n';

            });

            to_print += '                </ul>\n';
        };

        to_print += '                <div class="button--buy-now" name="button--buy-now">BUY NOW</div>\n';
        to_print += '            </div>\n';
        to_print += '            <ul class="ListingOverview__info">\n';
        if (listing.type === "") {
            listing.type = "???";
        }
        to_print += '                <li>\n';
        to_print += '                    Type: <span>' + listing.type + '</span>\n';
        to_print += '                </li>\n';

        if (listing.condition === "") {
            listing.condition = "???";
        }
        to_print += '                <li>\n';
        to_print += '                    Condition: <span>' + listing.condition + '</span>\n';
        to_print += '                </li>\n';
        to_print += '            </ul>\n';

        if ( listing.tags.length > 0 ) {
            to_print += '            <div class="ListingOverview__tags">\n';
            to_print += '                <h4>Tags</h4>\n';
            to_print += '                <ul>\n';

            $.each(listing.tags, function(index, tag) {
                to_print += '                    <li><span>' + tag + '</span></li>\n';
            });

            to_print += '                </ul>\n';
            to_print += '            </div>\n';
        };

        to_print += '        </div>\n';
        to_print += '    </div>\n';
        to_print += '</section>\n';

        return to_print;
    },

    overlayListingSlideShow: function( listing ){
        to_print = '';
        to_print += '<section class="Slideshow" id="ListingSlideshow">\n';
        to_print += '    <div class="Slidehow__controls" data-cycle-cmd="prev">\n';
        to_print += '        <i class="fa fa-chevron-left" aria-hidden="true"></i>\n';
        to_print += '    </div>\n';
        to_print += '   <div class="Slideshow__show cycle-slideshow"\n';
        to_print += '       data-cycle-fx=scrollHorz\n';
        to_print += '       data-cycle-timeout=0\n';
        to_print += '       data-cycle-pager="#Slideshow__pager"\n';
        to_print += '       data-cycle-pager-template="<li><img src={{src}}></li>"\n';
        to_print += '       data-cycle-auto-height="1:1"\n';
        to_print += '       >\n';

        $.each(listing.images, function(index, image) {
            to_print += '       <img src="' + image + '">\n';   
        });

        to_print += '   </div>\n';
        to_print += '   <div class="Slidehow__controls" data-cycle-cmd="next">\n';
        to_print += '       <i class="fa fa-chevron-right" aria-hidden="true"></i>\n';
        to_print += '   </div>\n';

        to_print += '    <!-- empty element for pager links -->';
        to_print += '    <ul id="Slideshow__pager" class="Slideshow__pager center external"></ul>';
        to_print += '</section>';

        return to_print;
    },

    overlayListingIndividualReview: function( rating ){
        var data = rating.ratingData;
        to_print = '';

        to_print += '<div class="flex ListingReview">\n';
        to_print += '    <div class="ListingReview__left">\n';
        to_print += '        <div class="ListingReview__header">\n';
        to_print += '            ' + moment(data.timestamp.seconds * 1000).format('MMMM Do YYYY, h:mm A') + ' <a>Anonymous</a>\n';
        to_print += '        </div>\n';
        to_print += '        <div class="ListingReview__body">\n';
        to_print += '            <p>' + (data.review ? data.review : 'None available.') + '<p>\n';
        to_print += '        </div>\n';
        to_print += '        <div class="ListingReview__bottom">\n';
        to_print += '            <div class="ListingReview__bottom__txn-details">\n';
        to_print += '                <pre>' + JSON.stringify(rating, null, 2) + '</pre>\n';
        to_print += '            </div>\n';
        to_print += '            <button class="button--shadowed button--txn-details">\n';
        to_print += '                Transaction Details\n';
        to_print += '            </button>\n';
        to_print += '        </div>\n';
        to_print += '    </div>\n';
        to_print += '    <div class="ListingReview__right">\n';
        to_print += '        <ul class="ListingRatings">\n';
        to_print += '            <li class="ListingRating">\n';
        to_print += '                <div class="ListingRating__left">\n';
        to_print += '                    Overall\n';
        to_print += '                </div>\n';
        to_print += '                <div class="ListingRating__right';

        switch(parseInt(data.overall, 10)) {
            case 5:
                to_print += ' stars--5">\n';
                break;
            case 4:
                to_print += ' stars--4">\n';
                break;
            case 3:
                to_print += ' stars--3">\n';
                break;
            case 2:
                to_print += ' stars--2">\n';
                break;
            case 1:
                to_print += ' stars--1">\n';
                break;
            default:
                to_print += ' stars--0">\n';
        }

        to_print += '                    <i class="fa fa-star icon--star" aria-hidden="true"></i>\n';
        to_print += '                    <i class="fa fa-star icon--star" aria-hidden="true"></i>\n';
        to_print += '                    <i class="fa fa-star icon--star" aria-hidden="true"></i>\n';
        to_print += '                    <i class="fa fa-star icon--star" aria-hidden="true"></i>\n';
        to_print += '                    <i class="fa fa-star icon--star" aria-hidden="true"></i>\n';
        to_print += '                </div>\n';
        to_print += '            </li>\n';
        to_print += '            <li class="ListingRating">\n';
        to_print += '                <div class="ListingRating__left">\n';
        to_print += '                    Quality\n';
        to_print += '                </div>\n';
        to_print += '                <div class="ListingRating__right';
        
        switch(parseInt(data.quality, 10)) {
            case 5:
                to_print += ' stars--5">\n';
                break;
            case 4:
                to_print += ' stars--4">\n';
                break;
            case 3:
                to_print += ' stars--3">\n';
                break;
            case 2:
                to_print += ' stars--2">\n';
                break;
            case 1:
                to_print += ' stars--1">\n';
                break;
            default:
                to_print += ' stars--0">\n';
        }

        to_print += '                    <i class="fa fa-star icon--star" aria-hidden="true"></i>\n';
        to_print += '                    <i class="fa fa-star icon--star" aria-hidden="true"></i>\n';
        to_print += '                    <i class="fa fa-star icon--star" aria-hidden="true"></i>\n';
        to_print += '                    <i class="fa fa-star icon--star" aria-hidden="true"></i>\n';
        to_print += '                    <i class="fa fa-star icon--star" aria-hidden="true"></i>\n';
        to_print += '                </div>\n';
        to_print += '            </li>\n';
        to_print += '            <li class="ListingRating">\n';
        to_print += '                <div class="ListingRating__left">\n';
        to_print += '                    Delivery Speed\n';
        to_print += '                </div>\n';
        to_print += '                <div class="ListingRating__right';

        switch(parseInt(data.deliverySpeed, 10)) {
            case 5:
                to_print += ' stars--5">\n';
                break;
            case 4:
                to_print += ' stars--4">\n';
                break;
            case 3:
                to_print += ' stars--3">\n';
                break;
            case 2:
                to_print += ' stars--2">\n';
                break;
            case 1:
                to_print += ' stars--1">\n';
                break;
            default:
                to_print += ' stars--0">\n';
        }

        to_print += '                    <i class="fa fa-star icon--star" aria-hidden="true"></i>\n';
        to_print += '                    <i class="fa fa-star icon--star" aria-hidden="true"></i>\n';
        to_print += '                    <i class="fa fa-star icon--star" aria-hidden="true"></i>\n';
        to_print += '                    <i class="fa fa-star icon--star" aria-hidden="true"></i>\n';
        to_print += '                    <i class="fa fa-star icon--star" aria-hidden="true"></i>\n';
        to_print += '                </div>\n';
        to_print += '            </li>\n';
        to_print += '            <li class="ListingRating">\n';
        to_print += '                <div class="ListingRating__left">\n';
        to_print += '                    Matched Description\n';
        to_print += '                </div>\n';
        to_print += '                <div class="ListingRating__right';

        switch(parseInt(data.description, 10)) {
            case 5:
                to_print += ' stars--5">\n';
                break;
            case 4:
                to_print += ' stars--4">\n';
                break;
            case 3:
                to_print += ' stars--3">\n';
                break;
            case 2:
                to_print += ' stars--2">\n';
                break;
            case 1:
                to_print += ' stars--1">\n';
                break;
            default:
                to_print += ' stars--0">\n';
        }

        to_print += '                    <i class="fa fa-star icon--star" aria-hidden="true"></i>\n';
        to_print += '                    <i class="fa fa-star icon--star" aria-hidden="true"></i>\n';
        to_print += '                    <i class="fa fa-star icon--star" aria-hidden="true"></i>\n';
        to_print += '                    <i class="fa fa-star icon--star" aria-hidden="true"></i>\n';
        to_print += '                    <i class="fa fa-star icon--star" aria-hidden="true"></i>\n';
        to_print += '                </div>\n';
        to_print += '            </li>\n';
        to_print += '            <li class="ListingRating">\n';
        to_print += '                <div class="ListingRating__left">\n';
        to_print += '                    Customer Service\n';
        to_print += '                </div>\n';
        to_print += '                <div class="ListingRating__right';

        switch(parseInt(data.customerService, 10)) {
            case 5:
                to_print += ' stars--5">\n';
                break;
            case 4:
                to_print += ' stars--4">\n';
                break;
            case 3:
                to_print += ' stars--3">\n';
                break;
            case 2:
                to_print += ' stars--2">\n';
                break;
            case 1:
                to_print += ' stars--1">\n';
                break;
            default:
                to_print += ' stars--0">\n';
        }

        to_print += '                    <i class="fa fa-star icon--star" aria-hidden="true"></i>\n';
        to_print += '                    <i class="fa fa-star icon--star" aria-hidden="true"></i>\n';
        to_print += '                    <i class="fa fa-star icon--star" aria-hidden="true"></i>\n';
        to_print += '                    <i class="fa fa-star icon--star" aria-hidden="true"></i>\n';
        to_print += '                    <i class="fa fa-star icon--star" aria-hidden="true"></i>\n';
        to_print += '                </div>\n';
        to_print += '            </li>\n';
        to_print += '        </ul>\n';
        to_print += '    </div>\n';
        to_print += '</div>\n';

        return to_print;
    },

    overlayListingShipping: function( listing ){
        to_print = '';

        to_print += '<section class="section ListingShipping" id="overlayListingShipping">\n';
        to_print += '    <h2>Shipping</h2>\n';
        to_print += '    <div class="ListingShipping__header">\n';
        to_print += '        <div>\n';
        to_print += '            Ships from: <span class="strong">United States</span>\n';
        to_print += '        </div>\n';
        to_print += '        <div>\n';
        to_print += '            Ships to: \n';
        to_print += '            <select>\n';
        $.each(listing.shipping_options, function(index, option) {
            to_print += '                <option vale="' + option.name.replace(/\s+/g, "-").toLowerCase() + '">' + option.name + '</option>\n';
        });
        to_print += '            </select>\n';
        to_print += '        </div>\n';
        to_print += '    </div>\n';

        $.each(listing.shipping_options, function(index, option) {
            to_print += '    <ul class="ListingShipping__body" id="shiping-option--' + option.name.replace(/\s+/g, "-").toLowerCase() + '">\n';
            
            $.each(option.services, function(index, service) {

                to_print += '        <li class="ListingShipping__option';
                // API returns no price property if price is 'FREE'
                if (service.price === undefined) {
                    to_print += '--free';
                };
                to_print += '">\n';

                to_print += '            <div>\n';
                to_print += '                ' + service.name + '\n';
                to_print += '            </div>\n';
                to_print += '            <div>\n';
                to_print += '                ' + service.estimatedDelivery + '\n';
                to_print += '            </div>\n';
                to_print += '            <div>\n';

                if (service.price === undefined) {
                    to_print += '                FREE\n';
                } else {
                    to_print += '                $' + service.price + '\n';
                }

                to_print += '            </div>\n';
                to_print += '        </li>\n';

            });

            to_print += '    </ul>\n';
        });

        to_print += '</section>\n';

        return to_print;
    },


};









