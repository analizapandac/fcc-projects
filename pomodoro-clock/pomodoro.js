// pomodoro clock

function pomodoroClock() {
    //i decided to use seconds instead of minutes
    var session = 1 * 60, temp_session = 1 * 60, temp_break = 1 * 60, break_time = 1 * 60, started = false, minutes = 0, seconds = 0, interval, prev_time = 0, is_break = false, is_seconds = false, seconds_remaining = 0, is_paused = false;
    var is_changed = false;

    return {
        start: start,
        pause: pause,
        isStarted: isStarted,
        changeTime: changeTime
    }

    function start() {

        console.log(seconds_remaining, session);

        // it is paused, add the last recorded seconds
        // i have to record each seconds remaining

        if( is_paused && is_changed){

            // add the last recorded seconds remaining to session
            session += seconds_remaining;
            if (is_break) {

                temp_break = session;

            } else {
                temp_session = session;
            }
        }

        // reset
        is_paused = false;
        is_changed = false;

        started = true;
        is_seconds = false;

        prev_time = parseInt(session / 60);

        // show span minutes
        jQuery('#span-minutes').show();

        jQuery('#span-minutes').html(zeroPad(parseInt(session / 60), 2));

        jQuery('#btn-start-pomodoro').hide();
        jQuery('#btn-stop-pomodoro').show();

        jQuery('#seconds-wrapper').css('visibility', 'visible');
        jQuery('#knob-minutes').removeClass('align-left');
        jQuery('#seconds-wrapper').removeClass('one-digit-minute');

        jQuery('#seconds-wrapper').css('color', 'rgb(135, 206, 235)');

        // knob options
        var options = {
            'displayInput': false,
            'max': session,
            'readOnly': true
        };

        redrawKnob(session, options);

        if(prev_time < 10) {
            jQuery('#knob-minutes').addClass('one-digit');
            jQuery('#seconds-wrapper').addClass('one-digit-minute');
        }

        // add is_time running class to seconds wrapper
        jQuery('#seconds-wrapper').addClass('is_time_running');

        //updateClockView();

        interval = setInterval(function(){

            if(session > 0)  session -= 1;

            if(session <= 59) {
                if( !is_seconds ){
                    is_seconds = true;
                    console.log('seconds nalng');
                }

            }

            updateClockView();


            if(session === 0){
                if( !is_break ){
                    is_seconds = false;
                    jQuery('#current-session-type').html('Break Time');
                    is_break = true;
                    console.log('break time started at', temp_break / 60);
                    session = temp_break;

                    clearInterval(interval);

                    start();

                } else {
                    console.log('restarted again', temp_session / 60);
                    jQuery('#current-session-type').html('Focus Time');

                    is_break = false;

                    session = temp_session;

                    clearInterval(interval);

                    start();
                }

            }
        }, 1000);


    }

    function zeroPad(number, width) {
        var string = String(number);
        while (string.length < width)
            string = "0" + string;
        return string;
    }

    function updateClockView() {
        if(session >= 60){
            minutes = session / 60;
            seconds = session % 60;
        }else {
            minutes = '00';
            seconds = session;
        }

        if(prev_time !== parseInt(session / 60)){
            if(parseInt(minutes) < 10) {
                jQuery('#knob-minutes').addClass('one-digit');
                jQuery('#seconds-wrapper').addClass('one-digit-minute');
            }
            
            //jQuery('#knob-minutes').val(parseInt(minutes)).trigger('change');

            // update span minutes value
        }

        jQuery('#knob-minutes').val(session).trigger('change');

        jQuery('#span-minutes').html(zeroPad(parseInt(minutes), 2));

        prev_time = parseInt(session / 60);
        // record each seconds remaining
        seconds_remaining = parseInt(seconds);

        jQuery('#knob-seconds').html(zeroPad(seconds, 2));
    }

    function redrawKnob(val, options) {

        // get the input element and its parent
        var knob_parent = jQuery("#knob-minutes").parent();
        // remove the parent which will also remove its child nodes
        knob_parent.remove();

        // prepend new input field for knob in time-wrapper div
        jQuery('#time-wrapper').prepend('<input type="text" id="knob-minutes" class="align-left" value="' + parseInt(val) + '">');

        // redraw the new input but now as a readOnly knob since the
        // clock is already started
        jQuery("#knob-minutes").knob(options);
    }

    function changeTime(time) {
        session = 60 * parseInt(time);

        // record that the time set was changed
        is_changed = true;

        if (is_break) {
            temp_break = 60 * parseInt(time);

        } else {
            temp_session = 60 * parseInt(time);
        }
        jQuery('#seconds-wrapper').css('visibility', 'visible');
        jQuery('#knob-minutes').removeClass('one-digit');
        jQuery('#seconds-wrapper').removeClass('one-digit-minute');
        jQuery('#knob-minutes').addClass('align-left');

        if(parseInt(session / 60) < 10) {
            //jQuery('#knob-minutes').removeClass('align-left');
            jQuery('#knob-minutes').addClass('one-digit');
            jQuery('#seconds-wrapper').addClass('one-digit-minute');
        }

        // update displayed minutes on the clock
        jQuery('#span-minutes').html(zeroPad(parseInt(session / 60), 2));
        
    }

    function pause() {

        // record that the session was paused
        is_paused = true;

        //temp_session = parseInt(session / 60);
        //temp_break = parseInt(break_time / 60);
        //console.log('session and break time', session, break_time);
        //console.log('temp session and break time', temp_session, temp_break);

        //started = false;

        clearInterval(interval);

        // knob options

        var handler = function (v) {
            changeTime(v);
        }

        var options = {
            'min':0,
            'max':59,
            'fgColor': '#449d44',
            'release': handler,
            'change': handler
        };
        redrawKnob(session / 60, options);

        jQuery('#span-minutes').html(zeroPad(parseInt(session / 60), 2));

        // hide span minutes
        jQuery('#span-minutes').hide();

        //jQuery('#pomodoro-options').show();
        jQuery('#btn-start-pomodoro').show();
        jQuery('#btn-stop-pomodoro').hide();
        jQuery('#seconds-wrapper').css('color', '#449d44');
        jQuery('#knob-minutes').removeClass('one-digit');
        jQuery('#seconds-wrapper').removeClass('one-digit-minute');
        //jQuery('#seconds-wrapper').css('visibility', 'hidden');

        if(parseInt(session / 60) < 10) {
            jQuery('#knob-minutes').addClass('align-left');
            jQuery('#knob-minutes').addClass('one-digit');
            jQuery('#seconds-wrapper').addClass('one-digit-minute');
        }

        // remove is_time running class to seconds wrapper because session is paused
        jQuery('#seconds-wrapper').removeClass('is_time_running');

    }

    function isStarted() {
        return started;
    }

}
