

/**********
* FILTERS AND CHECKBOXES (JavaScript)
* **********/

// jQuery (START)
$(document).ready(function () {

    // HIDE all non-JS elements
    $("#postButton").hide();
    $("#postButton").addClass("hidden");
    $("#postButton").attr("aria-hidden", true);
    $("#postButton").attr("hidden");

    // SHOW any hidden elements which we need for a JavaScript UX
    $(".search-field-wrap").show();
    $(".search-field-wrap").removeClass("hidden");
    $(".search-field-wrap").attr("aria-hidden", false);
    $(".search-field-wrap").removeAttr("hidden");
    $("#selectAllTrigger").show();
    $("#selectAllTrigger").removeClass("hidden");
    $("#selectAllTrigger").attr("aria-hidden", false);
    $("#selectAllTrigger").removeAttr("hidden");

    // Ensure (on load) we close all filter sections if the user is viewing in a smaller resolution (1024px by 1024px)
    (function () {

        var $container = $(".js-filter-collapsible-collections");

        // If the user is viewing with a width of 640 pixels of less then automatically close all filter sections
        if (screen.width < 641) {

            if ($container) {
                
                var $sections = $container.find(".js-filter-collapsible");
                
                $sections.each(function () {
                    
                    var $section = $(this);

                    $section.toggleContent = function () {
                        
                        $section.find(".js-filter-collapsible-content").toggle();
                        
                        var $openInput = $section.find("input[type=hidden]");
                        var $openURL = $section.find("a[type=button]");

                        // Update ARIA information on hidden input field
                        if ($openInput.val() === "true") {
                            $openInput.val("false");
                            $openInput.attr("aria-expanded","false");
                        }
                        else {
                            $openInput.val("true");
                            $openInput.attr("aria-expanded","true");
                        }

                        // Update ARIA information on the URL
                        if ($openURL.attr("aria-expanded") === "true") {
                            $openURL.attr("aria-expanded","false");
                        }
                        else {
                            $openURL.attr("aria-expanded","true");
                        }

                        $section.toggleClass("js-open");
                    };

                    $section.find("header").addClass("js-filter-collapsible-header");
                    $section.toggleContent();
                });

                $sections
                    .has(":hidden[value='false']")
                    .find(".js-filter-collapsible-content")
                    .hide()
                    .removeClass("js-open");
                $sections
                    .has(":hidden[value='true']")
                    .show()
                    .addClass("js-open");
            }

        }

    })();

    // Trigger the select all documents in document list rules (see below) via clicking "Select/deselect all team members" link
    $("#selectAllTrigger").click(function () {
        $("#document-checkbox").trigger("click");
    });

    // Filter (via clicking ERROR link) to show me only documents with errors
    $("#showMeErrorsOnlyErrorLink").click(function () {
        $("#queryFilterStatusError").trigger("click");
    });

    // Filter (via clicking link) to show me only documents with errors
    $("#showMeErrorsOnlyLink").click(function () {
        $("#queryFilterStatusError").trigger("click");
    });

    // Open/close ANY CHOSEN filter section - Toggles content based on user clicking or using the keyboard to open a grey filter section
    // GLOBAL
    // TRIGGER 1: 'click'
    (function () {

        var $container = $(".js-filter-collapsible-collections");

        if ($container) {
            
            var $sections = $container.find(".js-filter-collapsible");
            
            $sections.each(function () {
                
                var $section = $(this);

                $section.toggleContent = function () {
                    
                    $section.find(".js-filter-collapsible-content").toggle();
                    
                    var $openInput = $section.find("input[type=hidden]");
                    var $openURL = $section.find("a[type=button]");

                    // Update ARIA information on hidden input field
                    if ($openInput.val() === "true") {
                        $openInput.val("false");
                        $openInput.attr("aria-expanded","false");
                    }
                    else {
                        $openInput.val("true");
                        $openInput.attr("aria-expanded","true");
                    }

                    // Update ARIA information on the URL
                    if ($openURL.attr("aria-expanded") === "true") {
                        $openURL.attr("aria-expanded","false");
                    }
                    else {
                        $openURL.attr("aria-expanded","true");
                    }

                    $section.toggleClass("js-open");
                };

                // TRIGGER 1 - 'click'
                $section.find("header").addClass("js-filter-collapsible-header")
                .click(function () {
                    $section.toggleContent();
                });

            });

            $sections
                .has(":hidden[value='false']")
                .find(".js-filter-collapsible-content")
                .hide()
                .removeClass("js-open");
            $sections
                .has(":hidden[value='true']")
                .show()
                .addClass("js-open");
        }

    })();

    // Filter #1 (Academic Year) - Toggles content based on user clicking the 'Open all/Close all' link

    // Open/close ALL filter sections - Toggles content based on user pressing the 'return' key within grey filter sections
    // ACTION: '.keyup'
    $("#filter-keyboard-academic-year").keyup(function(event) {
        
        if (event.keyCode === 13) {
            
            var $container = $(".js-filter-collapsible-collections");

            if ($container) {
                
                var $sections = $container.find("#academic-year-filter");
                
                $sections.each(function () {
                    
                    var $section = $(this);

                    $section.toggleContent = function () {
                        
                        $section.find(".js-filter-collapsible-content").toggle();
                        
                        var $openInput = $section.find("input[type=hidden]");
                        var $openURL = $section.find("a[type=button]");

                        // Update ARIA information on hidden input field
                        if ($openInput.val() === "true") {
                            $openInput.val("false");
                            $openInput.attr("aria-expanded","false");
                        }
                        else {
                            $openInput.val("true");
                            $openInput.attr("aria-expanded","true");
                        }

                        // Update ARIA information on the URL
                        if ($openURL.attr("aria-expanded") === "true") {
                            $openURL.attr("aria-expanded","false");
                        }
                        else {
                            $openURL.attr("aria-expanded","true");
                        }

                        $section.toggleClass("js-open");
                    };

                    $section.find("header")
                    .addClass("js-filter-collapsible-header")
                    $section.toggleContent();

                });
                $sections
                    .has(":hidden[value='false']")
                    .find(".js-filter-collapsible-content")
                    .hide()
                    .removeClass("js-open");

                $sections
                    .has(":hidden[value='true']")
                    .show()
                    .addClass("js-open");
            }
            
        }

    });
    // Filter logic
    $("#academic-year-filter :input:checkbox").change(function () {
        
        var showAll = true;
        
        $('tr').not('.first').hide();
        $('tr').not('.first').addClass("hidden");
        $('tr').not('.first').attr("aria-hidden", true);
        $('tr').not('.first').attr("hidden");

        // Do this everytime a checkbox filter is selected
        $('input[type=checkbox]').each(function () {
            
            if ($(this)[0].checked) {
                
                showAll = false;
                var status = $(this).attr('rel');
                var value = $(this).val();

                $('td.' + status + '[rel="' + value + '"]').parent('tr').show();
                $('td.' + status + '[rel="' + value + '"]').parent('tr').removeClass("hidden");
                $('td.' + status + '[rel="' + value + '"]').parent('tr').attr("aria-hidden", false);
                $('td.' + status + '[rel="' + value + '"]').parent('tr').removeAttr("hidden");
            }

        });

        // If no checkbox filters are ticked, then restore the default page list of items
        if (showAll) {

            var dynamicPaginationForPage = $("#dynamicPaginationForPage").text();
            var totalListCount = $("#totalDocumentCount").text();
            var clearLocalStorage = $("#clearLocalStorage").text();
            var itemsPerPage = $("#itemsPerPage").text();
            var itemTypeLabel = $("#itemTypeLabel").text();
            var itemTypeLabelPlural = $("#itemTypeLabelPlural").text();

            // If dynamic pagination is activated for the page...
            if (dynamicPaginationForPage) {

                // If there are no checkboxes selected run the JavaScript paging on the page
                // Pass these parameters in (below)
                dynamicPagination(
                    // Total items (totalListCount)
                    totalListCount,
                    // Boolean whether to clear down the session data or not
                    clearLocalStorage,
                    // How many items to show per page
                    itemsPerPage,
                    itemTypeLabel,
                    itemTypeLabelPlural
                );

            }
            // Otherwise...
            else {
                $('tr').show();
                $('tr').removeClass("hidden");
                $('tr').attr("aria-hidden", false);
                $('tr').removeAttr("hidden");
            }

        }

    });

    // Filter #2 (Academy - Link) - Toggles content based on user clicking the 'Open all/Close all' link

    // Open/close ALL filter sections - Toggles content based on user pressing the 'return' key within grey filter sections
    // ACTION: '.keyup'
    $("#filter-keyboard-academy-link").keyup(function(event) {
        
        if (event.keyCode === 13) {
            
            var $container = $(".js-filter-collapsible-collections");

            if ($container) {
                
                var $sections = $container.find("#academy-link-filter");
                
                $sections.each(function () {
                    
                    var $section = $(this);

                    $section.toggleContent = function () {
                        
                        $section.find(".js-filter-collapsible-content").toggle();
                        
                        var $openInput = $section.find("input[type=hidden]");
                        var $openURL = $section.find("a[type=button]");

                        // Update ARIA information on hidden input field
                        if ($openInput.val() === "true") {
                            $openInput.val("false");
                            $openInput.attr("aria-expanded","false");
                        }
                        else {
                            $openInput.val("true");
                            $openInput.attr("aria-expanded","true");
                        }

                        // Update ARIA information on the URL
                        if ($openURL.attr("aria-expanded") === "true") {
                            $openURL.attr("aria-expanded","false");
                        }
                        else {
                            $openURL.attr("aria-expanded","true");
                        }

                        $section.toggleClass("js-open");
                    };

                    $section.find("header")
                    .addClass("js-filter-collapsible-header")
                    $section.toggleContent();

                });
                $sections
                    .has(":hidden[value='false']")
                    .find(".js-filter-collapsible-content")
                    .hide()
                    .removeClass("js-open");

                $sections
                    .has(":hidden[value='true']")
                    .show()
                    .addClass("js-open");
            }
            
        }

    });
    // Filter logic
    $("#academy-link-filter :input:checkbox").change(function () {

        var showAll = true;
        var checked = $("#filterContent :checkbox:checked");
        
        // Do this everytime a checkbox filter is selected
        $('.sectionContent').hide();
        $('.sectionContent').addClass("hidden");
        $('.sectionContent').attr("aria-hidden", true);
        $('.sectionContent').attr("hidden");

        if (checked.length) {

            showAll = false;

            checked.each(function() {
                $("." + $(this).val()).show();
                $("." + $(this).val()).removeClass("hidden");
                $("." + $(this).val()).attr("aria-hidden", false);
                $("." + $(this).val()).removeAttr("hidden");
            });
        }

        // If no checkbox filters are ticked, then restore the default page list of items
        if (showAll) {

            var dynamicPaginationForPage = $("#dynamicPaginationForPage").text();
            var totalListCount = $("#totalDocumentCount").text();
            var clearLocalStorage = $("#clearLocalStorage").text();
            var itemsPerPage = $("#itemsPerPage").text();
            var itemTypeLabel = $("#itemTypeLabel").text();
            var itemTypeLabelPlural = $("#itemTypeLabelPlural").text();

            // If dynamic pagination is activated for the page...
            if (dynamicPaginationForPage) {

                // If there are no checkboxes selected run the JavaScript paging on the page
                // Pass these parameters in (below)
                dynamicPagination(
                    // Total items (totalListCount)
                    totalListCount,
                    // Boolean whether to clear down the session data or not
                    clearLocalStorage,
                    // How many items to show per page
                    itemsPerPage,
                    itemTypeLabel,
                    itemTypeLabelPlural
                );

            }
            // Otherwise...
            else {
                $('.sectionContent').show();
                $('.sectionContent').removeClass("hidden");
                $('.sectionContent').attr("aria-hidden", false);
                $('.sectionContent').removeAttr("hidden");
            }

        }

    });

    // Filter #3 (Document Name Error) - Toggles content based on user clicking the 'Open all/Close all' link

    // Open/close ALL filter sections - Toggles content based on user pressing the 'return' key within grey filter sections
    // ACTION: '.keyup'
    $("#filter-keyboard-document-name-error").keyup(function(event) {
        
        if (event.keyCode === 13) {
            
            var $container = $(".js-filter-collapsible-collections");

            if ($container) {
                
                var $sections = $container.find("#document-name-error-filter");
                
                $sections.each(function () {
                    
                    var $section = $(this);

                    $section.toggleContent = function () {
                        
                        $section.find(".js-filter-collapsible-content").toggle();
                        
                        var $openInput = $section.find("input[type=hidden]");
                        var $openURL = $section.find("a[type=button]");

                        // Update ARIA information on hidden input field
                        if ($openInput.val() === "true") {
                            $openInput.val("false");
                            $openInput.attr("aria-expanded","false");
                        }
                        else {
                            $openInput.val("true");
                            $openInput.attr("aria-expanded","true");
                        }

                        // Update ARIA information on the URL
                        if ($openURL.attr("aria-expanded") === "true") {
                            $openURL.attr("aria-expanded","false");
                        }
                        else {
                            $openURL.attr("aria-expanded","true");
                        }

                        $section.toggleClass("js-open");
                    };

                    $section.find("header")
                    .addClass("js-filter-collapsible-header")
                    $section.toggleContent();

                });
                $sections
                    .has(":hidden[value='false']")
                    .find(".js-filter-collapsible-content")
                    .hide()
                    .removeClass("js-open");

                $sections
                    .has(":hidden[value='true']")
                    .show()
                    .addClass("js-open");
            }
            
        }

    });
    // Filter logic
    $("#document-name-error-filter :input:checkbox").change(function () {

        var showAll = true;
        
        $('tr').not('.first').hide();
        $('tr').not('.first').addClass("hidden");
        $('tr').not('.first').attr("aria-hidden", true);
        $('tr').not('.first').attr("hidden");

        // Do this everytime a checkbox filter is selected
        $('input[type=checkbox]').each(function () {
            
            if ($(this)[0].checked) {
                
                showAll = false;
                var status = $(this).attr('rel');
                var value = $(this).val();

                $('td.' + status + '[rel="' + value + '"]').parent('tr').show();
                $('td.' + status + '[rel="' + value + '"]').parent('tr').removeClass("hidden");
                $('td.' + status + '[rel="' + value + '"]').parent('tr').attr("aria-hidden", false);
                $('td.' + status + '[rel="' + value + '"]').parent('tr').removeAttr("hidden");
            }

        });

        // If no checkbox filters are ticked, then restore the default page list of items
        if (showAll) {

            var dynamicPaginationForPage = $("#dynamicPaginationForPage").text();
            var totalListCount = $("#totalDocumentCount").text();
            var clearLocalStorage = $("#clearLocalStorage").text();
            var itemsPerPage = $("#itemsPerPage").text();
            var itemTypeLabel = $("#itemTypeLabel").text();
            var itemTypeLabelPlural = $("#itemTypeLabelPlural").text();

            // If dynamic pagination is activated for the page...
            if (dynamicPaginationForPage) {

                // If there are no checkboxes selected run the JavaScript paging on the page
                // Pass these parameters in (below)
                dynamicPagination(
                    // Total items (totalListCount)
                    totalListCount,
                    // Boolean whether to clear down the session data or not
                    clearLocalStorage,
                    // How many items to show per page
                    itemsPerPage,
                    itemTypeLabel,
                    itemTypeLabelPlural
                );

            }
            // Otherwise...
            else {
                $('tr').show();
                $('tr').removeClass("hidden");
                $('tr').attr("aria-hidden", false);
                $('tr').removeAttr("hidden");
            }

        }

    });  


    // Filter #4 (Document Type) - Toggles content based on user clicking the 'Open all/Close all' link
    
    // Open/close ALL filter sections - Toggles content based on user pressing the 'return' key within grey filter sections
    // ACTION: '.keyup'
    $("#filter-keyboard-document-type").keyup(function(event) {
        
        if (event.keyCode === 13) {
            
            var $container = $(".js-filter-collapsible-collections");

            if ($container) {
                
                var $sections = $container.find("#document-type-filter");
                
                $sections.each(function () {
                    
                    var $section = $(this);

                    $section.toggleContent = function () {
                        
                        $section.find(".js-filter-collapsible-content").toggle();
                        
                        var $openInput = $section.find("input[type=hidden]");
                        var $openURL = $section.find("a[type=button]");

                        // Update ARIA information on hidden input field
                        if ($openInput.val() === "true") {
                            $openInput.val("false");
                            $openInput.attr("aria-expanded","false");
                        }
                        else {
                            $openInput.val("true");
                            $openInput.attr("aria-expanded","true");
                        }

                        // Update ARIA information on the URL
                        if ($openURL.attr("aria-expanded") === "true") {
                            $openURL.attr("aria-expanded","false");
                        }
                        else {
                            $openURL.attr("aria-expanded","true");
                        }

                        $section.toggleClass("js-open");
                    };

                    $section.find("header")
                    .addClass("js-filter-collapsible-header")
                    $section.toggleContent();

                });
                $sections
                    .has(":hidden[value='false']")
                    .find(".js-filter-collapsible-content")
                    .hide()
                    .removeClass("js-open");

                $sections
                    .has(":hidden[value='true']")
                    .show()
                    .addClass("js-open");
            }
            
        }
    
    });
    // Filter logic
    $("#document-type-filter :input:checkbox").change(function () {

        var showAll = true;
        
        $('tr').not('.first').hide();
        $('tr').not('.first').addClass("hidden");
        $('tr').not('.first').attr("aria-hidden", true);
        $('tr').not('.first').attr("hidden");

        // Do this everytime a checkbox filter is selected
        $('input[type=checkbox]').each(function () {
            
            if ($(this)[0].checked) {
                
                showAll = false;
                var status = $(this).attr('rel');
                var value = $(this).val();

                $('td.' + status + '[rel="' + value + '"]').parent('tr').show();
                $('td.' + status + '[rel="' + value + '"]').parent('tr').removeClass("hidden");
                $('td.' + status + '[rel="' + value + '"]').parent('tr').attr("aria-hidden", false);
                $('td.' + status + '[rel="' + value + '"]').parent('tr').removeAttr("hidden");
            }

        });

        // If no checkbox filters are ticked, then restore the default page list of items
        if (showAll) {

            var dynamicPaginationForPage = $("#dynamicPaginationForPage").text();
            var totalListCount = $("#totalDocumentCount").text();
            var clearLocalStorage = $("#clearLocalStorage").text();
            var itemsPerPage = $("#itemsPerPage").text();
            var itemTypeLabel = $("#itemTypeLabel").text();
            var itemTypeLabelPlural = $("#itemTypeLabelPlural").text();

            // If dynamic pagination is activated for the page...
            if (dynamicPaginationForPage) {

                // If there are no checkboxes selected run the JavaScript paging on the page
                // Pass these parameters in (below)
                dynamicPagination(
                    // Total items (totalListCount)
                    totalListCount,
                    // Boolean whether to clear down the session data or not
                    clearLocalStorage,
                    // How many items to show per page
                    itemsPerPage,
                    itemTypeLabel,
                    itemTypeLabelPlural
                );

            }
            // Otherwise...
            else {
                $('tr').show();
                $('tr').removeClass("hidden");
                $('tr').attr("aria-hidden", false);
                $('tr').removeAttr("hidden");
            }

        }

    });

    // Filter #5 (Local Authority) - Toggles content based on user clicking the 'Open all/Close all' link

    // Open/close ALL filter sections - Toggles content based on user pressing the 'return' key within grey filter sections
    // ACTION: '.keyup'
    $("#filter-keyboard-local-authority").keyup(function(event) {
        
        if (event.keyCode === 13) {
            
            var $container = $(".js-filter-collapsible-collections");

            if ($container) {
                
                var $sections = $container.find("#local-authority-filter");
                
                $sections.each(function () {
                    
                    var $section = $(this);

                    $section.toggleContent = function () {
                        
                        $section.find(".js-filter-collapsible-content").toggle();
                        
                        var $openInput = $section.find("input[type=hidden]");
                        var $openURL = $section.find("a[type=button]");

                        // Update ARIA information on hidden input field
                        if ($openInput.val() === "true") {
                            $openInput.val("false");
                            $openInput.attr("aria-expanded","false");
                        }
                        else {
                            $openInput.val("true");
                            $openInput.attr("aria-expanded","true");
                        }

                        // Update ARIA information on the URL
                        if ($openURL.attr("aria-expanded") === "true") {
                            $openURL.attr("aria-expanded","false");
                        }
                        else {
                            $openURL.attr("aria-expanded","true");
                        }

                        $section.toggleClass("js-open");
                    };

                    $section.find("header")
                    .addClass("js-filter-collapsible-header")
                    $section.toggleContent();

                });
                $sections
                    .has(":hidden[value='false']")
                    .find(".js-filter-collapsible-content")
                    .hide()
                    .removeClass("js-open");

                $sections
                    .has(":hidden[value='true']")
                    .show()
                    .addClass("js-open");
            }
            
        }

    });
    // Filter logic
    $("#local-authority-filter :input:checkbox").change(function () {

        var showAll = true;
        
        $('tr').not('.first').hide();
        $('tr').not('.first').addClass("hidden");
        $('tr').not('.first').attr("aria-hidden", true);
        $('tr').not('.first').attr("hidden");

        // Do this everytime a checkbox filter is selected
        $('input[type=checkbox]').each(function () {
            
            if ($(this)[0].checked) {
                
                showAll = false;
                var status = $(this).attr('rel');
                var value = $(this).val();

                $('td.' + status + '[rel="' + value + '"]').parent('tr').show();
                $('td.' + status + '[rel="' + value + '"]').parent('tr').removeClass("hidden");
                $('td.' + status + '[rel="' + value + '"]').parent('tr').attr("aria-hidden", false);
                $('td.' + status + '[rel="' + value + '"]').parent('tr').removeAttr("hidden");
            }

        });

        // If no checkbox filters are ticked, then restore the default page list of items
        if (showAll) {

            var dynamicPaginationForPage = $("#dynamicPaginationForPage").text();
            var totalListCount = $("#totalDocumentCount").text();
            var clearLocalStorage = $("#clearLocalStorage").text();
            var itemsPerPage = $("#itemsPerPage").text();
            var itemTypeLabel = $("#itemTypeLabel").text();
            var itemTypeLabelPlural = $("#itemTypeLabelPlural").text();

            // If dynamic pagination is activated for the page...
            if (dynamicPaginationForPage) {

                // If there are no checkboxes selected run the JavaScript paging on the page
                // Pass these parameters in (below)
                dynamicPagination(
                    // Total items (totalListCount)
                    totalListCount,
                    // Boolean whether to clear down the session data or not
                    clearLocalStorage,
                    // How many items to show per page
                    itemsPerPage,
                    itemTypeLabel,
                    itemTypeLabelPlural
                );

            }
            // Otherwise...
            else {
                $('tr').show();
                $('tr').removeClass("hidden");
                $('tr').attr("aria-hidden", false);
                $('tr').removeAttr("hidden");
            }

        }

    });

    // Filter #6 (Local Authority - Link) - Toggles content based on user clicking the 'Open all/Close all' link

    // Open/close ALL filter sections - Toggles content based on user pressing the 'return' key within grey filter sections
    // ACTION: '.keyup'
    $("#filter-keyboard-local-authority-link").keyup(function(event) {
        
        if (event.keyCode === 13) {
            
            var $container = $(".js-filter-collapsible-collections");

            if ($container) {
                
                var $sections = $container.find("#local-authority-link-filter");
                
                $sections.each(function () {
                    
                    var $section = $(this);

                    $section.toggleContent = function () {
                        
                        $section.find(".js-filter-collapsible-content").toggle();
                        
                        var $openInput = $section.find("input[type=hidden]");
                        var $openURL = $section.find("a[type=button]");

                        // Update ARIA information on hidden input field
                        if ($openInput.val() === "true") {
                            $openInput.val("false");
                            $openInput.attr("aria-expanded","false");
                        }
                        else {
                            $openInput.val("true");
                            $openInput.attr("aria-expanded","true");
                        }

                        // Update ARIA information on the URL
                        if ($openURL.attr("aria-expanded") === "true") {
                            $openURL.attr("aria-expanded","false");
                        }
                        else {
                            $openURL.attr("aria-expanded","true");
                        }

                        $section.toggleClass("js-open");
                    };

                    $section.find("header")
                    .addClass("js-filter-collapsible-header")
                    $section.toggleContent();

                });
                $sections
                    .has(":hidden[value='false']")
                    .find(".js-filter-collapsible-content")
                    .hide()
                    .removeClass("js-open");

                $sections
                    .has(":hidden[value='true']")
                    .show()
                    .addClass("js-open");
            }
            
        }

    });
    // Filter logic
    $("#local-authority-link-filter :input:checkbox").change(function () {

        var showAll = true;
        var checked = $("#filterContent :checkbox:checked");
        
        // Do this everytime a checkbox filter is selected
        $('.sectionContent').hide();
        $('.sectionContent').addClass("hidden");
        $('.sectionContent').attr("aria-hidden", true);
        $('.sectionContent').attr("hidden");

        if (checked.length) {

            showAll = false;

            checked.each(function() {
                $("." + $(this).val()).show();
                $("." + $(this).val()).removeClass("hidden");
                $("." + $(this).val()).attr("aria-hidden", false);
                $("." + $(this).val()).removeAttr("hidden");
            });
        }

        // If no checkbox filters are ticked, then restore the default page list of items
        if (showAll) {

            var dynamicPaginationForPage = $("#dynamicPaginationForPage").text();
            var totalListCount = $("#totalDocumentCount").text();
            var clearLocalStorage = $("#clearLocalStorage").text();
            var itemsPerPage = $("#itemsPerPage").text();
            var itemTypeLabel = $("#itemTypeLabel").text();
            var itemTypeLabelPlural = $("#itemTypeLabelPlural").text();

            // If dynamic pagination is activated for the page...
            if (dynamicPaginationForPage) {

                // If there are no checkboxes selected run the JavaScript paging on the page
                // Pass these parameters in (below)
                dynamicPagination(
                    // Total items (totalListCount)
                    totalListCount,
                    // Boolean whether to clear down the session data or not
                    clearLocalStorage,
                    // How many items to show per page
                    itemsPerPage,
                    itemTypeLabel,
                    itemTypeLabelPlural
                );

            }
            // Otherwise...
            else {
                $('.sectionContent').show();
                $('.sectionContent').removeClass("hidden");
                $('.sectionContent').attr("aria-hidden", false);
                $('.sectionContent').removeAttr("hidden");
            }

        }

    });

    // Filter #7 (Establishment Type) - Toggles content based on user clicking the 'Open all/Close all' link

    // Open/close ALL filter sections - Toggles content based on user pressing the 'return' key within grey filter sections
    // ACTION: '.keyup'
    $("#filter-keyboard-establishment-type").keyup(function(event) {
        
        if (event.keyCode === 13) {
            
            var $container = $(".js-filter-collapsible-collections");

            if ($container) {
                
                var $sections = $container.find("#establishment-type-filter");
                
                $sections.each(function () {
                    
                    var $section = $(this);

                    $section.toggleContent = function () {
                        
                        $section.find(".js-filter-collapsible-content").toggle();
                        
                        var $openInput = $section.find("input[type=hidden]");
                        var $openURL = $section.find("a[type=button]");

                        // Update ARIA information on hidden input field
                        if ($openInput.val() === "true") {
                            $openInput.val("false");
                            $openInput.attr("aria-expanded","false");
                        }
                        else {
                            $openInput.val("true");
                            $openInput.attr("aria-expanded","true");
                        }

                        // Update ARIA information on the URL
                        if ($openURL.attr("aria-expanded") === "true") {
                            $openURL.attr("aria-expanded","false");
                        }
                        else {
                            $openURL.attr("aria-expanded","true");
                        }

                        $section.toggleClass("js-open");
                    };

                    $section.find("header")
                    .addClass("js-filter-collapsible-header")
                    $section.toggleContent();

                });
                $sections
                    .has(":hidden[value='false']")
                    .find(".js-filter-collapsible-content")
                    .hide()
                    .removeClass("js-open");

                $sections
                    .has(":hidden[value='true']")
                    .show()
                    .addClass("js-open");
            }
            
        }

    });
    // Filter logic
    $("#establishment-type-filter :input:checkbox").change(function () {

        var showAll = true;
        
        $('tr').not('.first').hide();
        $('tr').not('.first').addClass("hidden");
        $('tr').not('.first').attr("aria-hidden", true);
        $('tr').not('.first').attr("hidden");

        // Do this everytime a checkbox filter is selected
        $('input[type=checkbox]').each(function () {
            
            if ($(this)[0].checked) {
                
                showAll = false;
                var status = $(this).attr('rel');
                var value = $(this).val();

                $('td.' + status + '[rel="' + value + '"]').parent('tr').show();
                $('td.' + status + '[rel="' + value + '"]').parent('tr').removeClass("hidden");
                $('td.' + status + '[rel="' + value + '"]').parent('tr').attr("aria-hidden", false);
                $('td.' + status + '[rel="' + value + '"]').parent('tr').removeAttr("hidden");

                // Update the total funding amount in the heading
                $(calculateSum);
            }

        });

        // If no checkbox filters are ticked, then restore the default page list of items
        if (showAll) {

            var dynamicPaginationForPage = $("#dynamicPaginationForPage").text();
            var totalListCount = $("#totalDocumentCount").text();
            var clearLocalStorage = $("#clearLocalStorage").text();
            var itemsPerPage = $("#itemsPerPage").text();
            var itemTypeLabel = $("#itemTypeLabel").text();
            var itemTypeLabelPlural = $("#itemTypeLabelPlural").text();

            // If dynamic pagination is activated for the page...
            if (dynamicPaginationForPage) {

                // If there are no checkboxes selected run the JavaScript paging on the page
                // Pass these parameters in (below)
                dynamicPagination(
                    // Total items (totalListCount)
                    totalListCount,
                    // Boolean whether to clear down the session data or not
                    clearLocalStorage,
                    // How many items to show per page
                    itemsPerPage,
                    itemTypeLabel,
                    itemTypeLabelPlural
                );

            }
            // Otherwise...
            else {
                $('tr').show();
                $('tr').removeClass("hidden");
                $('tr').attr("aria-hidden", false);
                $('tr').removeAttr("hidden");
            }

            // Update the total funding amount in the heading
            $(calculateSum);

        }

        // Function to count the totals within the updated funding table
        function calculateSum() {

            var sum = 0;
            var convertedSum;

            // Target all <td> with the class (.totalAllocation) which are not hidden
            $('td.totalAllocation:visible').each(function() {
                    
                var value = $(this).text();
                var number = Number(value.replace(/[^0-9.-]+/g,""));

                // Add only if the value is number
                if (!isNaN(number) && number.length != 0) {
                    sum += parseFloat(number);
                    convertedSum = accounting.formatMoney(sum, { precision: 0 });
                }

            });

            $('#heading-funding-summary').text(convertedSum);
        };

    });

    // Filter #8 (Establishment Type - Link) - Toggles content based on user clicking the 'Open all/Close all' link

    // Open/close ALL filter sections - Toggles content based on user pressing the 'return' key within grey filter sections
    // ACTION: '.keyup'
    $("#filter-keyboard-establishment-type-link").keyup(function(event) {
        
        if (event.keyCode === 13) {
            
            var $container = $(".js-filter-collapsible-collections");

            if ($container) {
                
                var $sections = $container.find("#establishment-type-link-filter");
                
                $sections.each(function () {
                    
                    var $section = $(this);

                    $section.toggleContent = function () {
                        
                        $section.find(".js-filter-collapsible-content").toggle();
                        
                        var $openInput = $section.find("input[type=hidden]");
                        var $openURL = $section.find("a[type=button]");

                        // Update ARIA information on hidden input field
                        if ($openInput.val() === "true") {
                            $openInput.val("false");
                            $openInput.attr("aria-expanded","false");
                        }
                        else {
                            $openInput.val("true");
                            $openInput.attr("aria-expanded","true");
                        }

                        // Update ARIA information on the URL
                        if ($openURL.attr("aria-expanded") === "true") {
                            $openURL.attr("aria-expanded","false");
                        }
                        else {
                            $openURL.attr("aria-expanded","true");
                        }

                        $section.toggleClass("js-open");
                    };

                    $section.find("header")
                    .addClass("js-filter-collapsible-header")
                    $section.toggleContent();

                });
                $sections
                    .has(":hidden[value='false']")
                    .find(".js-filter-collapsible-content")
                    .hide()
                    .removeClass("js-open");

                $sections
                    .has(":hidden[value='true']")
                    .show()
                    .addClass("js-open");
            }
            
        }

    });
    // Filter logic
    $("#establishment-type-link-filter :input:checkbox").change(function () {

        var showAll = true;
        var checked = $("#filterContent :checkbox:checked");
        
        // Do this everytime a checkbox filter is selected
        $('.sectionContent').hide();
        $('.sectionContent').addClass("hidden");
        $('.sectionContent').attr("aria-hidden", true);
        $('.sectionContent').attr("hidden");

        if (checked.length) {

            showAll = false;

            checked.each(function() {
                $("." + $(this).val()).show();
                $("." + $(this).val()).removeClass("hidden");
                $("." + $(this).val()).attr("aria-hidden", false);
                $("." + $(this).val()).removeAttr("hidden");
            });
        }

        // If no checkbox filters are ticked, then restore the default page list of items
        if (showAll) {

            var dynamicPaginationForPage = $("#dynamicPaginationForPage").text();
            var totalListCount = $("#totalDocumentCount").text();
            var clearLocalStorage = $("#clearLocalStorage").text();
            var itemsPerPage = $("#itemsPerPage").text();
            var itemTypeLabel = $("#itemTypeLabel").text();
            var itemTypeLabelPlural = $("#itemTypeLabelPlural").text();

            // If dynamic pagination is activated for the page...
            if (dynamicPaginationForPage) {

                // If there are no checkboxes selected run the JavaScript paging on the page
                // Pass these parameters in (below)
                dynamicPagination(
                    // Total items (totalListCount)
                    totalListCount,
                    // Boolean whether to clear down the session data or not
                    clearLocalStorage,
                    // How many items to show per page
                    itemsPerPage,
                    itemTypeLabel,
                    itemTypeLabelPlural
                );

            }
            // Otherwise...
            else {
                $('.sectionContent').show();
                $('.sectionContent').removeClass("hidden");
                $('.sectionContent').attr("aria-hidden", false);
                $('.sectionContent').removeAttr("hidden");
            }

        }

    });

    // Filter #9 (Organisation) - Toggles content based on user clicking the 'Open all/Close all' link
    
    // Open/close ALL filter sections - Toggles content based on user pressing the 'return' key within grey filter sections
    // ACTION: '.keyup'
    $("#filter-keyboard-organisation").keyup(function(event) {
        
        if (event.keyCode === 13) {
            
            var $container = $(".js-filter-collapsible-collections");

            if ($container) {
                
                var $sections = $container.find("#organisation-filter");
                
                $sections.each(function () {
                    
                    var $section = $(this);

                    $section.toggleContent = function () {
                        
                        $section.find(".js-filter-collapsible-content").toggle();
                        
                        var $openInput = $section.find("input[type=hidden]");
                        var $openURL = $section.find("a[type=button]");

                        // Update ARIA information on hidden input field
                        if ($openInput.val() === "true") {
                            $openInput.val("false");
                            $openInput.attr("aria-expanded","false");
                        }
                        else {
                            $openInput.val("true");
                            $openInput.attr("aria-expanded","true");
                        }

                        // Update ARIA information on the URL
                        if ($openURL.attr("aria-expanded") === "true") {
                            $openURL.attr("aria-expanded","false");
                        }
                        else {
                            $openURL.attr("aria-expanded","true");
                        }

                        $section.toggleClass("js-open");
                    };

                    $section.find("header")
                    .addClass("js-filter-collapsible-header")
                    $section.toggleContent();

                });
                $sections
                    .has(":hidden[value='false']")
                    .find(".js-filter-collapsible-content")
                    .hide()
                    .removeClass("js-open");

                $sections
                    .has(":hidden[value='true']")
                    .show()
                    .addClass("js-open");
            }
            
        }
    
    });
    // Filter logic
    $("#organisation-filter :input:checkbox").change(function () {

        var showAll = true;
        
        $('tr').not('.first').hide();
        $('tr').not('.first').addClass("hidden");
        $('tr').not('.first').attr("aria-hidden", true);
        $('tr').not('.first').attr("hidden");

        // Do this everytime a checkbox filter is selected
        $('input[type=checkbox]').each(function () {
            
            if ($(this)[0].checked) {
                
                showAll = false;
                var status = $(this).attr('rel');
                var value = $(this).val();

                $('td.' + status + '[rel="' + value + '"]').parent('tr').show();
                $('td.' + status + '[rel="' + value + '"]').parent('tr').removeClass("hidden");
                $('td.' + status + '[rel="' + value + '"]').parent('tr').attr("aria-hidden", false);
                $('td.' + status + '[rel="' + value + '"]').parent('tr').removeAttr("hidden");
            }

        });

        // If no checkbox filters are ticked, then restore the default page list of items
        if (showAll) {

            var dynamicPaginationForPage = $("#dynamicPaginationForPage").text();
            var totalListCount = $("#totalDocumentCount").text();
            var clearLocalStorage = $("#clearLocalStorage").text();
            var itemsPerPage = $("#itemsPerPage").text();
            var itemTypeLabel = $("#itemTypeLabel").text();
            var itemTypeLabelPlural = $("#itemTypeLabelPlural").text();

            // If dynamic pagination is activated for the page...
            if (dynamicPaginationForPage) {

                // If there are no checkboxes selected run the JavaScript paging on the page
                // Pass these parameters in (below)
                dynamicPagination(
                    // Total items (totalListCount)
                    totalListCount,
                    // Boolean whether to clear down the session data or not
                    clearLocalStorage,
                    // How many items to show per page
                    itemsPerPage,
                    itemTypeLabel,
                    itemTypeLabelPlural
                );

            }
            // Otherwise...
            else {
                $('tr').show();
                $('tr').removeClass("hidden");
                $('tr').attr("aria-hidden", false);
                $('tr').removeAttr("hidden");
            }

        }

    });

    // Filter #10 (Status) - Toggles content based on user clicking the 'Open all/Close all' link
    
    // Open/close ALL filter sections - Toggles content based on user pressing the 'return' key within grey filter sections
    // ACTION: '.keyup'
    $("#filter-keyboard-status").keyup(function(event) {
        
        if (event.keyCode === 13) {
            
            var $container = $(".js-filter-collapsible-collections");

            if ($container) {
                
                var $sections = $container.find("#status-filter");
                
                $sections.each(function () {
                    
                    var $section = $(this);

                    $section.toggleContent = function () {
                        
                        $section.find(".js-filter-collapsible-content").toggle();
                        
                        var $openInput = $section.find("input[type=hidden]");
                        var $openURL = $section.find("a[type=button]");

                        // Update ARIA information on hidden input field
                        if ($openInput.val() === "true") {
                            $openInput.val("false");
                            $openInput.attr("aria-expanded","false");
                        }
                        else {
                            $openInput.val("true");
                            $openInput.attr("aria-expanded","true");
                        }

                        // Update ARIA information on the URL
                        if ($openURL.attr("aria-expanded") === "true") {
                            $openURL.attr("aria-expanded","false");
                        }
                        else {
                            $openURL.attr("aria-expanded","true");
                        }

                        $section.toggleClass("js-open");
                    };

                    $section.find("header")
                    .addClass("js-filter-collapsible-header")
                    $section.toggleContent();

                });
                $sections
                    .has(":hidden[value='false']")
                    .find(".js-filter-collapsible-content")
                    .hide()
                    .removeClass("js-open");

                $sections
                    .has(":hidden[value='true']")
                    .show()
                    .addClass("js-open");
            }
            
        }
    
    });
    // Filter logic
    $("#status-filter :input:checkbox").change(function () {

        var showAll = true;
        
        $('tr').not('.first').hide();
        $('tr').not('.first').addClass("hidden");
        $('tr').not('.first').attr("aria-hidden", true);
        $('tr').not('.first').attr("hidden");

        // Do this everytime a checkbox filter is selected
        $('input[type=checkbox]').each(function () {
            
            if ($(this)[0].checked) {
                
                showAll = false;
                var status = $(this).attr('rel');
                var value = $(this).val();

                $('td.' + status + '[rel="' + value + '"]').parent('tr').show();
                $('td.' + status + '[rel="' + value + '"]').parent('tr').removeClass("hidden");
                $('td.' + status + '[rel="' + value + '"]').parent('tr').attr("aria-hidden", false);
                $('td.' + status + '[rel="' + value + '"]').parent('tr').removeAttr("hidden");
            }

        });

        // If no checkbox filters are ticked, then restore the default page list of items
        if (showAll) {

            var dynamicPaginationForPage = $("#dynamicPaginationForPage").text();
            var totalListCount = $("#totalDocumentCount").text();
            var clearLocalStorage = $("#clearLocalStorage").text();
            var itemsPerPage = $("#itemsPerPage").text();
            var itemTypeLabel = $("#itemTypeLabel").text();
            var itemTypeLabelPlural = $("#itemTypeLabelPlural").text();

            // If dynamic pagination is activated for the page...
            if (dynamicPaginationForPage) {

                // If there are no checkboxes selected run the JavaScript paging on the page
                // Pass these parameters in (below)
                dynamicPagination(
                    // Total items (totalListCount)
                    totalListCount,
                    // Boolean whether to clear down the session data or not
                    clearLocalStorage,
                    // How many items to show per page
                    itemsPerPage,
                    itemTypeLabel,
                    itemTypeLabelPlural
                );

            }
            // Otherwise...
            else {
                $('tr').show();
                $('tr').removeClass("hidden");
                $('tr').attr("aria-hidden", false);
                $('tr').removeAttr("hidden");
            }

        }

    });


    // Filter #11 (Type) - Toggles content based on user clicking the 'Open all/Close all' link
    
    // Open/close ALL filter sections - Toggles content based on user pressing the 'return' key within grey filter sections
    // ACTION: '.keyup'
    $("#filter-keyboard-type").keyup(function(event) {
        
        if (event.keyCode === 13) {
            
            var $container = $(".js-filter-collapsible-collections");

            if ($container) {
                
                var $sections = $container.find("#type-filter");
                
                $sections.each(function () {
                    
                    var $section = $(this);

                    $section.toggleContent = function () {
                        
                        $section.find(".js-filter-collapsible-content").toggle();
                        
                        var $openInput = $section.find("input[type=hidden]");
                        var $openURL = $section.find("a[type=button]");

                        // Update ARIA information on hidden input field
                        if ($openInput.val() === "true") {
                            $openInput.val("false");
                            $openInput.attr("aria-expanded","false");
                        }
                        else {
                            $openInput.val("true");
                            $openInput.attr("aria-expanded","true");
                        }

                        // Update ARIA information on the URL
                        if ($openURL.attr("aria-expanded") === "true") {
                            $openURL.attr("aria-expanded","false");
                        }
                        else {
                            $openURL.attr("aria-expanded","true");
                        }

                        $section.toggleClass("js-open");
                    };

                    $section.find("header")
                    .addClass("js-filter-collapsible-header")
                    $section.toggleContent();

                });
                $sections
                    .has(":hidden[value='false']")
                    .find(".js-filter-collapsible-content")
                    .hide()
                    .removeClass("js-open");

                $sections
                    .has(":hidden[value='true']")
                    .show()
                    .addClass("js-open");
            }
            
        }
    
    });
    // Filter logic
    $("#type-filter :input:checkbox").change(function () {

        var showAll = true;
        
        $('tr').not('.first').hide();
        $('tr').not('.first').addClass("hidden");
        $('tr').not('.first').attr("aria-hidden", true);
        $('tr').not('.first').attr("hidden");

        // Do this everytime a checkbox filter is selected
        $('input[type=checkbox]').each(function () {
            
            if ($(this)[0].checked) {
                
                showAll = false;
                var status = $(this).attr('rel');
                var value = $(this).val();

                $('td.' + status + '[rel="' + value + '"]').parent('tr').show();
                $('td.' + status + '[rel="' + value + '"]').parent('tr').removeClass("hidden");
                $('td.' + status + '[rel="' + value + '"]').parent('tr').attr("aria-hidden", false);
                $('td.' + status + '[rel="' + value + '"]').parent('tr').removeAttr("hidden");
            }

        });

        // If no checkbox filters are ticked, then restore the default page list of items
        if (showAll) {

            var dynamicPaginationForPage = $("#dynamicPaginationForPage").text();
            var totalListCount = $("#totalDocumentCount").text();
            var clearLocalStorage = $("#clearLocalStorage").text();
            var itemsPerPage = $("#itemsPerPage").text();
            var itemTypeLabel = $("#itemTypeLabel").text();
            var itemTypeLabelPlural = $("#itemTypeLabelPlural").text();

            // If dynamic pagination is activated for the page...
            if (dynamicPaginationForPage) {

                // If there are no checkboxes selected run the JavaScript paging on the page
                // Pass these parameters in (below)
                dynamicPagination(
                    // Total items (totalListCount)
                    totalListCount,
                    // Boolean whether to clear down the session data or not
                    clearLocalStorage,
                    // How many items to show per page
                    itemsPerPage,
                    itemTypeLabel,
                    itemTypeLabelPlural
                );

            }
            // Otherwise...
            else {
                $('tr').show();
                $('tr').removeClass("hidden");
                $('tr').attr("aria-hidden", false);
                $('tr').removeAttr("hidden");
            }

        }

    });

    // Filter #12 (Year) - Toggles content based on user clicking the 'Open all/Close all' link
    
    // Open/close ALL filter sections - Toggles content based on user pressing the 'return' key within grey filter sections
    // ACTION: '.keyup'
    $("#filter-keyboard-year").keyup(function(event) {
        
        if (event.keyCode === 13) {
            
            var $container = $(".js-filter-collapsible-collections");

            if ($container) {
                
                var $sections = $container.find("#year-filter");
                
                $sections.each(function () {
                    
                    var $section = $(this);

                    $section.toggleContent = function () {
                        
                        $section.find(".js-filter-collapsible-content").toggle();
                        
                        var $openInput = $section.find("input[type=hidden]");
                        var $openURL = $section.find("a[type=button]");

                        // Update ARIA information on hidden input field
                        if ($openInput.val() === "true") {
                            $openInput.val("false");
                            $openInput.attr("aria-expanded","false");
                        }
                        else {
                            $openInput.val("true");
                            $openInput.attr("aria-expanded","true");
                        }

                        // Update ARIA information on the URL
                        if ($openURL.attr("aria-expanded") === "true") {
                            $openURL.attr("aria-expanded","false");
                        }
                        else {
                            $openURL.attr("aria-expanded","true");
                        }

                        $section.toggleClass("js-open");
                    };

                    $section.find("header")
                    .addClass("js-filter-collapsible-header")
                    $section.toggleContent();

                });
                $sections
                    .has(":hidden[value='false']")
                    .find(".js-filter-collapsible-content")
                    .hide()
                    .removeClass("js-open");

                $sections
                    .has(":hidden[value='true']")
                    .show()
                    .addClass("js-open");
            }
            
        }
    
    });
    // Filter logic
    $("#year-filter :input:checkbox").change(function () {

        var showAll = true;
        
        $('tr').not('.first').hide();
        $('tr').not('.first').addClass("hidden");
        $('tr').not('.first').attr("aria-hidden", true);
        $('tr').not('.first').attr("hidden");

        // Do this everytime a checkbox filter is selected
        $('input[type=checkbox]').each(function () {
            
            if ($(this)[0].checked) {
                
                showAll = false;
                var status = $(this).attr('rel');
                var value = $(this).val();

                $('td.' + status + '[rel="' + value + '"]').parent('tr').show();
                $('td.' + status + '[rel="' + value + '"]').parent('tr').removeClass("hidden");
                $('td.' + status + '[rel="' + value + '"]').parent('tr').attr("aria-hidden", false);
                $('td.' + status + '[rel="' + value + '"]').parent('tr').removeAttr("hidden");
            }

        });

        // If no checkbox filters are ticked, then restore the default page list of items
        if (showAll) {

            var dynamicPaginationForPage = $("#dynamicPaginationForPage").text();
            var totalListCount = $("#totalDocumentCount").text();
            var clearLocalStorage = $("#clearLocalStorage").text();
            var itemsPerPage = $("#itemsPerPage").text();
            var itemTypeLabel = $("#itemTypeLabel").text();
            var itemTypeLabelPlural = $("#itemTypeLabelPlural").text();

            // If dynamic pagination is activated for the page...
            if (dynamicPaginationForPage) {

                // If there are no checkboxes selected run the JavaScript paging on the page
                // Pass these parameters in (below)
                dynamicPagination(
                    // Total items (totalListCount)
                    totalListCount,
                    // Boolean whether to clear down the session data or not
                    clearLocalStorage,
                    // How many items to show per page
                    itemsPerPage,
                    itemTypeLabel,
                    itemTypeLabelPlural
                );

            }
            // Otherwise...
            else {
                $('tr').show();
                $('tr').removeClass("hidden");
                $('tr').attr("aria-hidden", false);
                $('tr').removeAttr("hidden");
            }

        }

    });

});
// jQuery (END)

// JavaScript (START)
// Select and unselect all documents in the document list
function selectAll(divid) {
    
    var selectAllCheckbox = document.getElementById('document-checkbox').checked;
    var totalDocumentCount = document.getElementById('totalDocumentCount').textContent;

    if (selectAllCheckbox == true) {

        var checks = document.querySelectorAll('#' + divid + ' input[type="checkbox"]');
        
        for (var i = 0; i < checks.length; i++) {
        
            var check = checks[i];
            check.checked = true;
    
        }

        document.getElementById("documentsSelectedText").innerHTML = totalDocumentCount + " documents selected";
        document.getElementById("selectAllTrigger").innerHTML = "Deselect all documents";
        document.getElementById("selectAllLabel").innerHTML = "Deselect all documents";
    }
    else {

        var checks = document.querySelectorAll('#' + divid + ' input[type="checkbox"]');

        for (var i = 0; i < checks.length; i++) {
        
            var check = checks[i];
            check.checked = false;
    
        }

        document.getElementById("documentsSelectedText").innerHTML = "0 documents selected";
        document.getElementById("selectAllTrigger").innerHTML = "Select all documents";
        document.getElementById("selectAllLabel").innerHTML = "Select all documents";
    }

}
// JavaScript (END)