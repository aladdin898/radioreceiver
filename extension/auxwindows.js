// Copyright 2013 Google Inc. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Functions for managing auxiliary windows.
 */
var AuxWindows = (function() {

  /**
   * Shows a window to save a preset.
   * @param {number} frequency The current frequency.
   * @param {number} display The frequency's display name.
   * @param {number} name The current name for the station.
   * @param {string} band The name of the station's band.
   * @param {string} mode The station's mode.
   */
  function savePreset(frequency, display, name, band, mode, presets) {
    chrome.app.window.create('savedialog.html', {
        'bounds': {
          'width': 300,
          'height': 120
        },
        'resizable': false
      }, function(win) {
        win.contentWindow['opener'] = window;
        var stationData = {
          'frequency': frequency,
          'display': display,
          'band': band,
          'mode': mode,
          'name': name
        };
        win.contentWindow['station'] = stationData;
    });
  }

  /**
   * Shows a window to change the application settings.
   * @param {Object} settings The current settings.
   */
  function settings(settings) {
    chrome.app.window.create('settings.html', {
        'bounds': {
          'width': 350,
          'height': 220
        },
        'resizable': false
      }, function(win) {
        win.contentWindow['opener'] = window;
        win.contentWindow['settings'] = settings;
    });
  }

  /**
   * Shows a window for the frequency correction factor estimator.
   * @param {AppWindow} mainWindow The app's main window.
   */
  function estimatePpm(mainWindow) {
    chrome.app.window.create('estimateppm.html', {
        'bounds': {
          'width': 350,
          'height': 250
        },
        'resizable': false
      }, function(win) {
        win.contentWindow['opener'] = window;
        win.contentWindow['mainWindow'] = mainWindow;
    });  
  }

  /**
   * Shows an error window.
   * @param {string} msg The error message to show.
   */
  function error(msg) {
    chrome.app.window.create('error.html', {
        'bounds': {
          'width': 500,
          'height': 125
        },
        'resizable': false
      }, function(win) {
        win.contentWindow['opener'] = window;
        win.contentWindow['errorMsg'] = msg;
    });
  }

  /**
   * Shows the help window.
   * @param {string} anchor An optional anchor to jump to.
   */
  function help(anchor) {
    chrome.app.window.create('help.html' + (anchor ? '#' + anchor : ''), {
        'bounds': {
          'width': 700,
          'height': 600
        },
        'resizable': true
      });
  }

  /**
   * Resizes the current window to the given dimensions, compensating for zoom.
   * @param {number} width The desired width.
   * @param {number} height The desired height.
   */
  function resizeCurrentTo(width, height) {
    // If the user has set a custom zoom level, resize the window to fit
    var zoom = chrome.app.window.current().getBounds().width / window.innerWidth;
    chrome.app.window.current().resizeTo(width * zoom, height * zoom);
  }

  /**
   * Closes the current window.
   */
  function closeCurrent() {
    chrome.app.window.current().close();
  }

  /**
   * Closes all windows.
   */
  function closeAll() {
    var current = chrome.app.window.current();
    var all = chrome.app.window.getAll();
    for (var i = 0; i < all.length; ++i) {
      if (all[i] !== current) {
        all[i].close();
      }
    }
    current.close();
  }

  return {
    savePreset: savePreset,
    settings: settings,
    estimatePpm: estimatePpm,
    error: error,
    help: help,
    resizeCurrentTo: resizeCurrentTo,
    closeCurrent: closeCurrent,
    closeAll: closeAll
  };

})();
