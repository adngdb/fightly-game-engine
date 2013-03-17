BUILD_DIR=./build
COMPILER=$(BUILD_DIR)/r.js

all: fightly.js

fightly.js:
	node $(COMPILER) -o $(BUILD_DIR)/build.js

tests:
	./node_modules/mocha/bin/mocha ./test

clean:
	rm fightly.js
