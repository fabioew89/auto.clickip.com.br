/*! @preserve
 * bstreeview.js
 * Version: 1.2.1
 * Authors: Sami CHNITER <sami.chniter@gmail.com>
 * Copyright 2020
 * License: Apache License 2.0
 *
 * Project: https://github.com/chniter/bstreeview
 * Project: https://github.com/nhmvienna/bs5treeview (bootstrap 5)
 */
; 
(function ($, window, document, undefined) {
  "use strict";
  /**
   * Default bstreeview  options.
   */
  var pluginName = "bstreeview",
      defaults = {
        expandIcon: 'fa fa-angle-down fa-fw',
        collapseIcon: 'fa fa-angle-right fa-fw',
        expandClass: 'show',
        indent: 1.25,
        parentsMarginLeft: '1.25rem',
        openNodeLinkOnNewTab: true
    };
  /**
   * bstreeview HTML templates.
   */
  var templates = {
    treeview: '<div class="bstreeview"></div>',
    treeviewItem: '<div role="treeitem" class="list-group-item" data-bs-toggle="collapse"></div>',
    treeviewGroupItem: '<div role="group" class="list-group collapse" id="itemid"></div>',
    treeviewItemStateIcon: '<i class="state-icon"></i>',
    treeviewItemIcon: '<i class="item-icon"></i>'
  };

   /**
   * BsTreeview Plugin constructor.
   * @param {*} element
   * @param {*} options
   */

  function bstreeView(element, options) {
    this.element = element;
    this.itemIdPrefix = element.id + "-item-";
    this.settings = $.extend({}, defaults, options);
    this.init();
  }

   /**
   * Avoid plugin conflict.
   */

  $.extend(bstreeView.prototype, {

    /**
    * bstreeview intialize.
    */

    init: function () {
    this.tree = [];
    this.nodes = [];

        // Retrieve bstreeview Json Data.

        if (this.settings.data) {
            if (this.settings.data.isPrototypeOf(String)) {
                this.settings.data = $.parseJSON(this.settings.data);
              }
              this.tree = $.extend(true, [], this.settings.data);
              delete this.settings.data;
          }

          // Set main bstreeview class to element.

          $(this.element).addClass('bstreeview');
          this.initData({ nodes: this.tree });
          var _this = this;
          this.build($(this.element), this.tree, 0);

          // Update angle icon on collapse

          $(this.element).on('click', '.list-group-item', function (e) {
            $('.state-icon', this)
                .toggleClass(_this.settings.expandIcon)
                .toggleClass(_this.settings.collapseIcon);

              // navigate to href if present

              if (e.target.hasAttribute('href')) {
                  if (_this.settings.openNodeLinkOnNewTab) {
                    window.open(e.target.getAttribute('href'), '_blank');
                }
                  else {
                    window.location = e.target.getAttribute('href');
                }
              }
              else
              {
                  // Toggle the data-bs-target. Issue with Bootstrap toggle and dynamic code
                  $($(this).attr("data-bs-target")).collapse('toggle');
              }
          });
      },
      /**
       * Initialize treeview Data.
       * @param {*} node
       */
      initData: function (node) {
          if (!node.nodes) return;
          var parent = node;
          var _this = this;
          $.each(node.nodes, function checkStates(index, node) {

              node.nodeId = _this.nodes.length;
              node.parentId = parent.nodeId;
              _this.nodes.push(node);

              if (node.nodes) {
                  _this.initData(node);
              }
          });
      },

      /**
       * Build treeview.
       * @param {*} parentElement
       * @param {*} nodes
       * @param {*} depth
       */

      build: function (parentElement, nodes, depth) {
          var _this = this;

          // Calculate item padding.

          var leftPadding = _this.settings.parentsMarginLeft;

          if (depth > 0) {
            leftPadding = (_this.settings.indent + depth * _this.settings.indent).toString() + "rem;";
          }
          depth += 1;

          // Add each node and sub-nodes.

          $.each(nodes, function addNodes(id, node) {

          // Main node element.

              var treeItem = $(templates.treeviewItem)
                .attr('data-bs-target', "#" + _this.itemIdPrefix + node.nodeId)
                .attr('style', 'padding-left:' + leftPadding)
                .attr('aria-level', depth);

           // Set Expand and Collapse icones.

            if (node.nodes) {
                var treeItemStateIcon = $(templates.treeviewItemStateIcon)
                .addClass((node.expanded)?_this.settings.expandIcon:_this.settings.collapseIcon);
                treeItem.append(treeItemStateIcon);
            }

           // set node icon if exist.

            if (node.icon) {
                var treeItemIcon = $(templates.treeviewItemIcon)
                .addClass(node.icon);
                treeItem.append(treeItemIcon);
            }

              // Set node Text.

                treeItem.append(node.text);

              // Reset node href if present

            if (node.href) {
               treeItem.attr('href', node.href);
            }
              // Add class to node if present
              if (node.class) {
                treeItem.addClass(node.class);
              }
              // Add custom id to node if present
              if (node.id) {
                treeItem.attr('id', node.id);
              }

              // Attach node to parent.

              parentElement.append(treeItem);

              // Build child nodes.

              if (node.nodes) {

              // Node group item.

                var treeGroup = $(templates.treeviewGroupItem)
                .attr('id', _this.itemIdPrefix + node.nodeId);
                parentElement.append(treeGroup);
                _this.build(treeGroup, node.nodes, depth);
                if (node.expanded) {
                treeGroup.addClass(_this.settings.expandClass);
                }
              }
          });
      }
  });

  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations

  $.fn[pluginName] = function (options) {
      return this.each(function () {
        if (!$.data(this, "plugin_" + pluginName)) {
            $.data(this, "plugin_" +
            pluginName, new bstreeView(this, options));
          }
      });
  };
})(jQuery, window, document);

//Disables the button on forms until all the fields are not null
//window.onload statement makes sure the script below runs on the start of the page without cheats 

window.onload = function showscript() { 

  const form = document.getElementById('formslist'); // Replace 'yourFormId' with your actual form ID
  const submitButton = form.querySelector('[id="showMessageButton"]'); // Get the submit button
  let validationCompleted = false; // Flag to track validation completion

  form.addEventListener('input', () => {
    submitButton.disabled = true; // Initially disable the button

    const inputs = form.querySelectorAll('input:required, textarea:required'); // Select all required inputs and textareas

    // Check if all required inputs have values
    for (const input of inputs) {
      if (!input.value.trim()) { // Check if value is empty after trimming whitespace
        return; // Exit the loop if any input is empty
      }
    }

    // If all required inputs have values, enable the button and set validationCompleted flag
    
    submitButton.disabled = false; // Initially disable the button 

//Showmessagebutton logic to after the forms is rightly fullfiled it will
//redirect the user to the script page after click  
// function (event) allows it to be executed in following sequence

const button = document.getElementById('showMessageButton')

button.addEventListener("click", function(event) {
  event.preventDefault();
  window.location.href = "http://127.0.0.1:5000"; // Replace with your target URL
});
})

}


// Function to redirect on click button to endpoint home "/" of the flask application

function gotoscriptpage () {

  // On click buttons will redirect to dm4370scriptgenerator page //

  window.location.href = "http://127.0.0.1:5000/"

}

// Function to redirect on click button to endpoint "/vplstunneling" of the flask application


function gotoscriptpagevpls () {

  // On click buttons will redirect to vplstunneling.html page //

  window.location.href = "http://127.0.0.1:5000/vplstunneling"

}
  
  
//Block some inputs on the field, logic

const elementIds = ['circuito'];

for (const id of elementIds) {
  const element = document.getElementById(id);

  element.addEventListener('input', function() {
    const allowedChars = /[A0-Z9_]/; // Allowed characters (adjust as needed)
    let newInput = '';

    for (let char of this.value) { // Use 'this' to access current element's value
      if (allowedChars.test(char)) {
        newInput += char;
      }
    }

    element.value = newInput;
  });

  
}

// client input field exception

const cliente = document.getElementById('cliente');
cliente.addEventListener('input', function() {
  const allowedChars = /[A-Z0-9-_]/; // Allowed characters (adjust as needed)
  let newInput = '';

  for (let char of this.value) { // Use 'this' to access the cliente element's value
    if (allowedChars.test(char)) {
      newInput += char;
    }
  }

  cliente.value = newInput;
});

//Porta Rede Metro logic input field 

const portmetro = document.getElementById('numerovlan metro');

portmetro.addEventListener('input', function() {
  const allowedChars = /[1-4]/; // Allowed characters (adjust as needed)
  let newInput = '';

  for (let char of this.value) { // Use 'this' to access the cliente element's value
    if (allowedChars.test(char)) {
      newInput += char;
    }
  }

  portmetro.value = newInput;
});

//Porta Rede Cpe logic input field 

const portcpe = document.getElementById('numerovlan cpe');

portcpe.addEventListener('input', function() {
  const allowedChars = /[5-8]/; // Allowed characters (adjust as needed)
  let newInput = '';

  for (let char of this.value) { // Use 'this' to access the cliente element's value
    if (allowedChars.test(char)) {
      newInput += char;
    }
  }

  portcpe.value = newInput;
});

// Número da Vlan input field

const vlan = document.getElementById('numerovlan');
const minValue = 2; // Minimum allowed value
const maxValue = 4094; // Maximum allowed value

vlan.addEventListener('input', function () {
  let newValue = this.value; // Get current input

  // Remove all characters except numbers, ".", "+" or "-".
  newValue = newValue.replace(/[^0-9\-+\.]/g, "");

  // Check if the remaining value is a valid number within the range
  const parsedValue = parseFloat(newValue);
  if (isNaN(parsedValue) || parsedValue < minValue || parsedValue > maxValue) {
    newValue = ""; // Reset to empty if not a valid number or outside range
  }

  vlan.value = newValue;
});


//checkboxes logic check
//checkboxes multiple selection (PRODUCT SELECTION)

const checkboxes = document.querySelectorAll('[id^="change-phrase-checkbox"]'); // Select all checkboxes with IDs starting with "change-phrase-checkbox"

const phraseSpan = document.getElementById("dropdownCheckboxButton");

function buildFinalPhrase() {
  let finalPhrase = "";
  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      finalPhrase += checkbox.value + " "; // Append checkbox value with space
    }
  });
  return finalPhrase.trim(); // Remove trailing space if any
}

// Event listener for all checkboxes (using a single function)

checkboxes.forEach(checkbox => {
  checkbox.addEventListener("click", function() {
    phraseSpan.textContent = buildFinalPhrase();
  });
});



// Event listener for all checkboxes (using a single function)

checkboxes.forEach(checkbox => {
  checkbox.addEventListener("click", function() {
    phraseSpan.textContent = buildFinalPhrase();
  });
});


//second dropdown menu (CPE SPEED)

const checkboxescpe = document.querySelectorAll('[id^="cpespeed"]'); // Select all checkboxes with IDs starting with "change-phrase-checkbox"
const phraseSpancpe = document.getElementById("dropdownCPE");

function buildFinalPhrase2() {
  let finalPhrase = "";
  checkboxescpe.forEach(checkbox => {
    if (checkbox.checked) {
      finalPhrase = checkbox.value; // Append checkbox value with space
    }
  });
  return finalPhrase.trim(); // Remove trailing space if any
}

// Event listener for all checkboxes (using a single function)

checkboxescpe.forEach(checkbox => {
checkbox.addEventListener("click", function() {
phraseSpancpe.textContent = buildFinalPhrase2();
    
  });
});

//Third dropdown menu (METRO speed)

const checkboxesmetro = document.querySelectorAll('[id^="metrospeed"]'); // Select all checkboxes with IDs starting with "change-phrase-checkbox"
const phraseSpanmetro = document.getElementById("dropdownMETRO");

function buildFinalPhrasemetro() {
  let finalPhrase = "";
  checkboxesmetro.forEach(checkbox => {
    if (checkbox.checked) {
      finalPhrase = checkbox.value; // Append checkbox value with space
    }
  });
  return finalPhrase.trim(); // Remove trailing space if any
}

// Event listener for all checkboxes (using a single function)

checkboxesmetro.forEach(checkbox => {
  checkbox.addEventListener("click", function() {
    phraseSpanmetro.textContent = buildFinalPhrasemetro();
    
  });
});



const form = document.getElementById("formslist");
const resultWindow = document.getElementById("result-window");

form.addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent default form submission

  const circuito = document.getElementById("circuito").value;
  const cliente = document.getElementById("cliente").value;

  const data = {
    circuito: circuito,
    cliente: cliente
  };

  // AJAX request
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/teste.py", true); // Replace with your server-side script URL
  xhr.setRequestHeader("Content-Type", "application/json"); // Send data as JSON

  xhr.onload = function() {
    if (xhr.status === 200) { // Check for successful response
      const responseText = xhr.responseText;
      resultWindow.textContent = responseText; // Display response text in the result window
    } else {
      console.error("Error:", xhr.statusText);
      resultWindow.textContent = "An error occurred.";
    }
  };

  xhr.send(JSON.stringify(data)); // Send data as JSON string
});





























































//DM4370EDDMETROSCRIPT.html

