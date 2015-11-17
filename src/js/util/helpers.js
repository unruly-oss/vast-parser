define(['../../../node_modules/validator/validator'], function(validator) {

    function getSecondsFromTimeString(timeString) {
        var durationInSeconds = 0,
            timeSegments;

        if(typeof timeString !== 'string') {
            return;
        }

        timeSegments = timeString.split(':').filter(function(timeSegment, i) {
            return validator.isNumeric(timeSegment) || (i === 2 && validator.isFloat(timeSegment));
        });

        if(timeSegments.length !== 3) {
            return;
        }

        timeSegments.forEach(function(timeSegment, i) {
            durationInSeconds += (parseFloat(timeSegment, 10) * Math.pow(60, 2 - i));
        });

        return durationInSeconds;
    }

    function decodeXML(encodedXMLString) {
        return encodedXMLString.replace(/&apos;/g, '\'')
                                .replace(/&quot;/g, '"')
                                .replace(/&gt;/g, '>')
                                .replace(/&lt;/g, '<')
                                .replace(/&amp;/g, '&');
    }

    function convertProtocol(url) {
        if(url.indexOf('https') === 0) {
            return url;
        } else if(url.indexOf('http') === 0) {
            return url.substr(5);
        } else {
            return url;
        }
    }

    return {
        getSecondsFromTimeString: getSecondsFromTimeString,
        decodeXML: decodeXML,
        convertProtocol: convertProtocol,
        isURL: validator.isURL
    };
});