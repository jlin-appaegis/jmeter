# Usage

1. Setup properties likes `sample.properties`
2. Import a test plan likes `apollo-server.jmx`
3. Run `./apache-jmeter-5.5/bin/jmeter -n -t apollo-server.jmx -q sample.properties -l test_plan.jtl -j test_plan.log`