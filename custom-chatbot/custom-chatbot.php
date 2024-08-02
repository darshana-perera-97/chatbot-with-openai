<?php
/*
Plugin Name: Custom Chatbot
Description: A custom chatbot plugin.
Version: 1.0
Author: Your Name
*/

// Enqueue styles and scripts
function custom_chatbot_enqueue_scripts() {
    wp_enqueue_style('custom-chatbot-css', plugin_dir_url(__FILE__) . 'custom-chatbot.css');
    wp_enqueue_script('custom-chatbot-js', plugin_dir_url(__FILE__) . 'custom-chatbot.js', array('jquery'), null, true);
}
add_action('wp_enqueue_scripts', 'custom_chatbot_enqueue_scripts');

// Add chatbot HTML to footer
function custom_chatbot_footer() {
    ?>
    <div class="chatbot-container">
        <button class="chatbot-toggle closed" id="chatbotToggle" onclick="toggleChatbot()">+</button>
        <div class="chatbot" id="chatbot" style="display: none;">
            <div class="chatbot-header">Chatbot</div>
            <div class="chatbot-messages" id="chatbotMessages"></div>
            <div class="chatbot-input" id="chatbotInput" style="display: none;">
                <input type="text" id="chatInput" placeholder="Type a message..." />
                <button onclick="handleSend()">Send</button>
            </div>
            <div id="userForm" class="user-form">
                <form id="userFormElement" onsubmit="handleFormSubmit(event)">
                    <p>Welcome to chat with Chatbot</p>
                    <input type="text" id="userName" placeholder="Name" required />
                    <input type="text" id="userNumber" placeholder="Number" required />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    </div>
    <?php
}
add_action('wp_footer', 'custom_chatbot_footer');
