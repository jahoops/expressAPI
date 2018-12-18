var flashcards = (function () {
    'use strict';

    var Flashcards = /** @class */ (function () {
        function Flashcards(name, cardData) {
            this.SetCards = [];
            this.Buckets = [];
            this.CurrentBucket = 0 /* A */;
            this.SetName = name;
            this.Buckets[0 /* A */] = [];
            this.Buckets[1 /* B */] = [];
            this.Buckets[2 /* C */] = [];
            if (cardData) {
                for (var r = 0; r < cardData.length; r++) {
                    this.SetCards.push(cardData[r]);
                    this.Buckets[this.CurrentBucket].push(r);
                }
                this.saveToLS();
            }
            else {
                this.getFromLS();
            }
        }
        Flashcards.prototype.next = function () {
            var limitC = 16;
            var limitB = 33;
            var last = { index: this.CurrentCardIndex, bucket: this.CurrentBucket };
            var r = Math.floor(Math.random() * 100);
            if (r < limitC && this.Buckets[2 /* C */].length > 0) {
                this.CurrentBucket = 2 /* C */;
            }
            else if (r < limitB && this.Buckets[1 /* B */].length > 0) {
                this.CurrentBucket = 1 /* B */;
            }
            else if (this.Buckets[0 /* A */].length > 0) {
                this.CurrentBucket = 0 /* A */;
            }
            else if (this.Buckets[1 /* B */].length > 0) {
                this.CurrentBucket = 1 /* B */;
            }
            else if (this.Buckets[2 /* C */].length > 0) {
                this.CurrentBucket = 2 /* C */;
            }
            else {
                alert("ERROR: No cards found.");
                return;
            }
            var count = 0;
            do {
                this.CurrentCardIndex = Math.floor(Math.random() * this.Buckets[this.CurrentBucket].length);
                count++;
            } while (last.bucket == this.CurrentBucket && last.index == this.CurrentCardIndex && count < 3);
            return this.SetCards[this.Buckets[this.CurrentBucket][this.CurrentCardIndex]];
        };
        Flashcards.prototype.correct = function () {
            if (this.CurrentBucket === 0 /* A */) {
                this.moveQuestion(1 /* B */);
            }
            else if (this.CurrentBucket === 1 /* B */) {
                this.moveQuestion(2 /* C */);
            }
            else if (this.CurrentBucket === 2 /* C */) ;
            else
                this.moveQuestion(1 /* B */);
            this.saveToLS();
        };
        Flashcards.prototype.wrong = function () {
            this.moveQuestion(0 /* A */);
            this.saveToLS();
        };
        Flashcards.prototype.moveQuestion = function (toBucket) {
            if (this.CurrentBucket !== toBucket) {
                this.Buckets[toBucket].push(this.Buckets[this.CurrentBucket][this.CurrentCardIndex]);
                this.Buckets[this.CurrentBucket].splice(this.CurrentCardIndex, 1);
            }
        };
        Flashcards.prototype.saveToLS = function () {
            localStorage['jbf-SetCards-' + this.SetName] = JSON.stringify(this.SetCards);
            localStorage['jbf-BucketA-' + this.SetName] = JSON.stringify(this.Buckets[0 /* A */]);
            localStorage['jbf-BucketB-' + this.SetName] = JSON.stringify(this.Buckets[1 /* B */]);
            localStorage['jbf-BucketC-' + this.SetName] = JSON.stringify(this.Buckets[2 /* C */]);
        };
        Flashcards.prototype.getFromLS = function () {
            this.SetCards = JSON.parse(localStorage['jbf-SetCards-' + this.SetName] || "[]");
            this.Buckets[0 /* A */] = JSON.parse(localStorage['jbf-BucketA-' + this.SetName] || "[]");
            this.Buckets[1 /* B */] = JSON.parse(localStorage['jbf-BucketB-' + this.SetName] || "[]");
            this.Buckets[2 /* C */] = JSON.parse(localStorage['jbf-BucketC-' + this.SetName] || "[]");
            this.CurrentBucket = this.Buckets[0 /* A */].length ? 0 /* A */ : this.Buckets[1 /* B */].length ? 1 /* B */ : 2 /* C */;
        };
        Flashcards.prototype.resetBuckets = function () {
            this.Buckets[0 /* A */] = [];
            for (var c = 0; c < this.SetCards.length; c++) {
                this.Buckets[0 /* A */].push(c);
            }
            this.CurrentBucket = 0 /* A */;
            this.Buckets[1 /* B */] = [];
            this.Buckets[2 /* C */] = [];
            this.saveToLS();
        };
        return Flashcards;
    }());

    return Flashcards;

}());
